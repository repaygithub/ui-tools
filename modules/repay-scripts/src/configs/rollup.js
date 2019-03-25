module.exports = getRollupConfig

const path = require('path')
const fs = require('fs')

const rollupResolve = require('rollup-plugin-node-resolve')
const rollupCommonjs = require('rollup-plugin-commonjs')
const rollupBabel = require('rollup-plugin-babel')
const rollupCleanup = require('rollup-plugin-cleanup')
const rollupSourceMaps = require('rollup-plugin-sourcemaps')
const rollupFilesize = require('rollup-plugin-filesize')
const rollupCopy = require('rollup-plugin-cpy')

const svgRegex = /\.svg$/
const isSvg = id => svgRegex.test(id)
const isLocalRegex = /^[\.\/]/
const getSvgExternalizer = (distFile, cwd) => id => {
  if (isSvg(id) && isLocalRegex.test(id)) {
    const svgFileLocation = path.resolve(cwd, 'dist/icons', path.basename(id))
    const distFilePath = path.dirname(distFile)
    const relativePath = path.relative(distFilePath, svgFileLocation)
    return relativePath.startsWith('.') ? relativePath : './' + relativePath
  }
  return id
}

function getRollupConfig(input, { cwd }) {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(cwd, 'package.json'), 'utf8'))
  if (!pkg.main || !pkg.module) {
    throw new Error('package.json#main && package.json#module are required')
  }
  const peerDeps = Object.keys(pkg.peerDependencies || {})
  return {
    input,
    external: id => isSvg(id) || peerDeps.includes(id),
    output: [
      {
        file: path.resolve(cwd, pkg.module),
        format: 'es',
        sourcemap: true,
        paths: getSvgExternalizer(path.resolve(cwd, pkg.module), cwd),
      },
      {
        file: path.resolve(cwd, pkg.main),
        format: 'cjs',
        sourcemap: true,
        paths: getSvgExternalizer(path.resolve(cwd, pkg.main), cwd),
      },
    ],
    plugins: [
      rollupResolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svg'],
      }),
      rollupCommonjs({
        include: 'node_modules/**',
        namedExports: {
          'react-is': ['isForwardRef'],
        },
      }),
      rollupBabel({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'],
        babelrc: false,
        presets: ['@repay/babel-preset'],
      }),
      rollupCopy({ files: 'src/**/*.svg', dest: 'dist/icons' }),
      rollupCleanup(),
      rollupSourceMaps(),
      rollupFilesize(),
    ],
  }
}
