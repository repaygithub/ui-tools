module.exports = build

const path = require('path')
const util = require('util')
const rollup = require('rollup')

const webpack = require('webpack')
const asyncWebpack = util.promisify(webpack)
const getRollupConfig = require('../configs/rollup')
const getWebpackConfig = require('../configs/web')
const logger = require('../helpers/logger')

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
  logger.log('building...')
  const input = path.resolve(options.cwd, options.entry)
  const isLibrary = options.lib

  if (isLibrary) {
    let config = getRollupConfig(input, options)
    if (options.config) {
      config = require(options.config)(config, options)
      logger.debug('rollup configuration', config)
    }
    logger.debug(config)
    logger.debug('starting rollup...')
    const bundle = await rollup.rollup(pick(config, inputOptions))
    logger.debug('finished bundling, staring rollup write...')
    let writePromises = config.output.map(out => bundle.write(pick(out, outputOptions)))

    if (options.treeShaking) {
      logger.debug('starting babel...')
      const pkg = require('../helpers/modulePkg')(options.cwd)
      const babelTranspiler = require('../helpers/babelTranspiler')
      babelTranspiler.init(input, path.resolve(options.cwd, pkg.module))
      let files = [input]
      while (files.length) {
        const from = files.shift()
        const { dependencies, promises } = await babelTranspiler.run(from, options)
        files.push(...dependencies)
        writePromises.push(...promises)
      }
    }

    await Promise.all(writePromises)
    logger.log('finished writing.')
  } else {
    logger.debug({ input })
    let config = getWebpackConfig(input, options)
    if (options.config) {
      const configFromOptions = require(options.config)
      config = await configFromOptions(config, options)
      logger.debug('webpack configuration', config)
      delete config.devServer
    }
    const stats = await asyncWebpack(config)
    logger.log(stats.toString({ colors: true, chunks: false, modules: false }))
    if (stats.hasErrors()) {
      throw Error('See webpack build errors above.')
    }
  }
}
