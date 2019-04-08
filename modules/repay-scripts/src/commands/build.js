module.exports = build

const path = require('path')
const util = require('util')
const rollup = require('rollup')

const webpack = require('webpack')
const asyncWebpack = util.promisify(webpack)
const getRollupConfig = require('../configs/rollup')
const getWebpackConfig = require('../configs/web')

const inputOptions = [
  'external',
  'input', // required
  'plugins',

  // advanced input options
  'cache',
  'inlineDynamicImports',
  'manualChunks',
  'onwarn',
  'preserveModules',

  // danger zone
  'acorn',
  'acornInjectPlugins',
  'context',
  'moduleContext',
  'preserveSymlinks',
  'shimMissingExports',
  'treeshake',

  // experimental
  'chunkGroupingSize',
  'experimentalCacheExpiry',
  'experimentalOptimizeChunks',
  'experimentalTopLevelAwait',
  'perf',
]

const outputOptions = [
  'dir',
  'file',
  'format', // required
  'globals',
  'name',

  // advanced output options
  'assetFileNames',
  'banner',
  'chunkFileNames',
  'compact',
  'entryFileNames',
  'extend',
  'footer',
  'interop',
  'intro',
  'outro',
  'paths',
  'sourcemap',
  'sourcemapExcludeSources',
  'sourcemapFile',
  'sourcemapPathTransform',

  // danger zone
  'amd',
  'esModule',
  'exports',
  'freeze',
  'indent',
  'namespaceToStringTag',
  'noConflict',
  'preferConst',
  'strict',
]

const pick = (object, keys) =>
  keys.reduce((mem, k) => {
    if (object[k]) {
      mem[k] = object[k]
    }
    return mem
  }, {})

async function build(options) {
  console.log('building...')
  const input = path.resolve(options.cwd, options.entry)
  const isLibrary = options.lib

  if (isLibrary) {
    let config = getRollupConfig(input, options)
    if (options.config) {
      config = require(options.config)(config, options)
      options.debug && console.log('rollup configuration', config)
    }
    options.debug && console.log(config)
    options.debug && console.log('starting bundler...')
    const bundle = await rollup.rollup(pick(config, inputOptions))
    options.debug && console.log('finished bundling, staring write...')
    let writePromises = config.output.map(out => bundle.write(pick(out, outputOptions)))
    await Promise.all(writePromises)
    console.log('finished writing.')
  } else {
    options.debug && console.log({ input })
    let config = getWebpackConfig(input, options)
    if (options.config) {
      config = require(options.config)(config, options)
      options.debug && console.log('webpack configuration', config)
      delete config.devServer
    }
    const stats = await asyncWebpack(config)
    console.log(stats.toString({ colors: true, chunks: false, modules: false }))
    if (stats.hasErrors()) {
      throw Error('See webpack build errors above.')
    }
  }
}
