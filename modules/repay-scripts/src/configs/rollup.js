module.exports = getRollupConfig

const path = require('path')
const logger = require('../helpers/logger')

const { nodeResolve: rollupResolve } = require('@rollup/plugin-node-resolve')
const rollupCommonjs = require('@rollup/plugin-commonjs')
const { babel: rollupBabel } = require('@rollup/plugin-babel')
const rollupCleanup = require('rollup-plugin-cleanup')
const rollupSourceMaps = require('rollup-plugin-sourcemaps')
const rollupFilesize = require('rollup-plugin-filesize')
const getBabelConfig = require('./babel')

function getRollupConfig(input, { cwd, treeShaking, babelEnv }) {
  const pkg = require('../helpers/modulePkg')(cwd)
  if (treeShaking && !pkg.hasOwnProperty('sideEffects')) {
    logger.log('[WARN] when using the --tree-shaking option you should define the')
    logger.log('\t"sideEffects" property in your package.json')
    logger.log('\thttps://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free')
  }
  if (!pkg.main && !pkg.module) {
    throw new Error('package.json#main or package.json#module are required')
  }
  const externalDeps = Object.keys(pkg.peerDependencies || {}).concat(
    Object.keys(pkg.dependencies || {})
  )
  return {
    input,
    external: (id) => externalDeps.some((name) => id.startsWith(name)),
    output: [
      pkg.module &&
        !treeShaking && {
          file: path.resolve(cwd, pkg.module),
          format: 'es',
          sourcemap: true,
        },
      pkg.main && {
        file: path.resolve(cwd, pkg.main),
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ].filter(Boolean),
    plugins: [
      rollupResolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svg'],
      }),
      rollupCommonjs({
        include: /node_modules/,
      }),
      rollupBabel({
        babelHelpers: babelEnv === 'test' ? 'bundled' : 'runtime',
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'],
        babelrc: false,
        ...getBabelConfig(),
      }),
      rollupCleanup(),
      rollupSourceMaps(),
      rollupFilesize(),
    ],
  }
}
