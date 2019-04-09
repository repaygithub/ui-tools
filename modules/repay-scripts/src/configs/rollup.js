module.exports = getRollupConfig

const path = require('path')
const fs = require('fs')

const rollupResolve = require('rollup-plugin-node-resolve')
const rollupCommonjs = require('rollup-plugin-commonjs')
const rollupBabel = require('rollup-plugin-babel')
const rollupCleanup = require('rollup-plugin-cleanup')
const rollupSourceMaps = require('rollup-plugin-sourcemaps')
const rollupFilesize = require('rollup-plugin-filesize')

function getRollupConfig(input, { cwd }) {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(cwd, 'package.json'), 'utf8'))
  if (!pkg.main && !pkg.module) {
    throw new Error('package.json#main or package.json#module are required')
  }
  const externalDeps = Object.keys(pkg.peerDependencies || {}).concat(
    Object.keys(pkg.dependencies || {})
  )
  return {
    input,
    external: id => externalDeps.includes(id),
    output: [
      pkg.module && {
        file: path.resolve(cwd, pkg.module),
        format: 'es',
        sourcemap: true,
      },
      pkg.main && {
        file: path.resolve(cwd, pkg.main),
        format: 'cjs',
        sourcemap: true,
      },
    ].filter(Boolean),
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
      rollupCleanup(),
      rollupSourceMaps(),
      rollupFilesize(),
    ],
  }
}
