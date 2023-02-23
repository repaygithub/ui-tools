const path = require('path')
const fs = require('fs')
const babel = require('@babel/core')
const traverse = require('@babel/traverse').default
const types = require('@babel/types')
const logger = require('./logger')

let seen = null

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx']

module.exports = {
  init(from, to) {
    seen = new Map([[from, to]])
  },
  isNew(from) {
    return !seen.has(from)
  },
  async run(from, options) {
    const to = seen.get(from)
    const fromDirectory = from.replace(path.basename(from), '')
    const toDirectory = to.replace(path.basename(to), '')
    logger.debug(from + ' => ' + to)
    const { code, map, ast } = await babel.transformFileAsync(from, {
      cwd: options.cwd,
      babelrc: false,
      presets: [require.resolve('@repay/babel-preset')],
      sourceMaps: true,
      ast: true,
    })

    function getPathsWithExtension(relativeSrc) {
      const src = path.resolve(fromDirectory, relativeSrc)
      const ext = path.extname(src)
      if (!ext) {
        for (const extension of EXTENSIONS) {
          const srcPath = src + extension
          if (fs.existsSync(srcPath)) {
            const destPath = path.resolve(toDirectory, relativeSrc + '.js')
            return { src: srcPath, dest: destPath }
          }
        }
        if (fs.existsSync(src)) {
          // Probably a directory, look for an index file.
          return getPathsWithExtension(relativeSrc + '/index')
        }
      } else if (fs.existsSync(src)) {
        const relativeDest = relativeSrc.replace(new RegExp(ext + '$'), '.js')
        return { src, dest: path.resolve(toDirectory, relativeDest) }
      }
    }

    let dependencies = []
    function gatherRelativeDeps(codePath) {
      if (
        types.isStringLiteral(codePath.node.source) &&
        codePath.node.source.value.startsWith('.')
      ) {
        const paths = getPathsWithExtension(codePath.node.source.value)
        if (paths && !seen.has(paths.src)) {
          if (paths.dest.includes(options.cwd) && paths.src !== paths.dest) {
            seen.set(paths.src, paths.dest)
            dependencies.push(paths.src)
          } else {
            seen.set(paths.src, null)
            logger.log(
              `[WARN] not building ${paths.src} because it is either outside the CWD or will overwrite the code itself`
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
