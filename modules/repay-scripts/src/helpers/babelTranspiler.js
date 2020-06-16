const path = require('path')
const fs = require('fs')
const babel = require('@babel/core')
const traverse = require('@babel/traverse').default
const types = require('@babel/types')
const logger = require('./logger')

let seen = null

module.exports = {
  init(from, to) {
    seen = new Map([[from, to]])
  },
  isNew(from) {
    return !seen.has(from)
  },
  async run(from, options) {
    const to = seen.get(from)
    logger.debug(from + ' => ' + to)
    const { code, map, ast } = await babel.transformFileAsync(from, {
      cwd: options.cwd,
      babelrc: false,
      presets: [require.resolve('@repay/babel-preset')],
      sourceMaps: true,
      ast: true,
    })

    let dependencies = []
    function gatherRelativeDeps(codePath) {
      if (
        types.isStringLiteral(codePath.node.source) &&
        codePath.node.source.value.startsWith('.')
      ) {
        const source = codePath.node.source.value
        let depPath = path.resolve(from.replace(path.basename(from), ''), source)
        let ext = path.extname(source)
        if (!ext) {
          ext = ['.ts', '.tsx', '.js', '.jsx'].find((e) => fs.existsSync(depPath + e))
        }
        depPath = depPath + ext
        if (depPath.includes('placeholder')) {
          console.log('yoyoyoyo')
        }
        if (!seen.has(depPath)) {
          let depTo = path.resolve(
            to.replace(path.basename(to), ''),
            source.replace(ext, '') + '.js'
          )
          if (depTo.includes(options.cwd) && depPath !== depTo) {
            seen.set(depPath, depTo)
            dependencies.push(depPath)
          } else {
            seen.set(depPath, null)
            logger.log(
              `[WARN] not building ${depPath} because it is either outside the CWD or will overwrite the code itself`
            )
          }
        }
      }
    }
    traverse(ast, {
      ImportDeclaration: gatherRelativeDeps,
      ExportNamedDeclaration: gatherRelativeDeps,
      ExportDefaultDeclaration: gatherRelativeDeps,
      ExportAllDeclaration: gatherRelativeDeps,
    })

    let toPath = path.dirname(to)
    if (!fs.existsSync(toPath)) {
      await fs.promises.mkdir(toPath, { recursive: true })
    }
    return {
      dependencies,
      promises: [
        fs.promises.writeFile(to, code),
        fs.promises.writeFile(to + '.map', JSON.stringify(map)),
      ],
    }
  },
}
