module.exports = dev

const path = require('path')
const logger = require('../helpers/logger')
const fs = require('fs')

const HOST = '0.0.0.0'

const startServer = async (server) => {
  await server.start()
  logger.log('Building web application...')
}

async function dev(options) {
  logger.debug('building dev environment...')
  const input = path.resolve(options.cwd, options.entry)
  const isLibrary = options.lib
  if (isLibrary) {
    const rollup = require('rollup')
    const getRollupConfig = require('../configs/rollup')
    let config = getRollupConfig(input, options)
    if (options.config) {
      config = require(options.config)(config, options)
      logger.debug('rollup configuration', config)
    }
    logger.debug('building library...')
    let watcher = rollup.watch(config)
    watcher.on('event', (event) => {
      if (event.code === 'ERROR') {
        console.error('Error generating bundle')
        console.error(event.error)
      } else if (event.code === 'FATAL') {
        console.error(`\nFatal Rollup Error [${event.error.code}]`)
        console.error('\t' + event.error.toString() + '\n')
        process.exit(1)
      }
    })
    if (options.treeShaking) {
      logger.debug('starting babel...')
      const pkg = require('../helpers/modulePkg')(options.cwd)
      const babelTranspiler = require('../helpers/babelTranspiler')
      babelTranspiler.init(input, path.resolve(options.cwd, pkg.module))
      let files = [input]
      const watchedFiles = new Set()
      let isTranspiling = false
      let isFirstCompile = true

      function addToWatch(from) {
        watchedFiles.add(from)
        fs.watch(from, (eventType) => {
          logger.debug(eventType, from)
          files.push(from)
          transpileFiles()
        })
      }

      async function transpileFiles() {
        // avoid starting parallel compilations
        if (isTranspiling === true) {
          return
        }
        isTranspiling = true
        let writePromises = []
        let touchedFiles = new Set()
        while (files.length) {
          const from = files.shift()
          touchedFiles.add(from)
          if (!watchedFiles.has(from)) {
            addToWatch(from)
          }
          const { dependencies, promises } = await babelTranspiler.run(from, options)
          files.push(...dependencies)
          writePromises.push(...promises)
        }
        let wasFirstCompile = isFirstCompile
        isFirstCompile = false
        isTranspiling = false
        await Promise.all(writePromises)
        if (wasFirstCompile) {
          logger.log('finished transpiling individual files')
        } else {
          logger.log('updated files:')
          for (const f of touchedFiles) {
            console.log(`\t${f}`)
          }
        }
      }

      await transpileFiles()
    }
  } else {
    const webpack = require('webpack')
    const webpackDevServer = require('webpack-dev-server')
    const getWebpackConfig = require('../configs/web')
    const PORT = options.port
    let config = getWebpackConfig(input, options)
    let serverConfig = {
      port: PORT,
      host: HOST,
      hot: true,
      https: true,
      historyApiFallback: true,
      client: {
        logging: 'error',
        overlay: true,
      },
      static: {
        directory: 'dist',
      },
      devMiddleware: {
        publicPath: '/',
      },
    }
    if (options.config) {
      config.devServer = serverConfig
      const configFromOptions = require(options.config)
      config = await configFromOptions(config, options)
      logger.debug('webpack configuration', config)
      serverConfig = config.devServer
      delete config.devServer
    }
    const compiler = webpack(config)

    let isFirstCompile = true
    // shamelessly copied from react-dev-utils/WebpackDevServerUtils.js
    // "invalid" is short for "bundle invalidated", it doesn't imply any errors
    compiler.hooks.invalid.tap('invalid', () => {
      if (isFirstCompile === false) {
        logger.log(`Compiling...`)
      } else {
        logger.log('\n\nChanges detected, recompiling...')
      }
    })

    compiler.hooks.done.tap('done', async (stats) => {
      // We have switched off the default Webpack output in WebpackDevServer
      const statsData = stats.toJson({
        all: false,
        warnings: true,
        errors: true,
      })

      const isSuccessful = !statsData.errors.length && !statsData.warnings.length
      if (isSuccessful) {
        logger.debug(stats.toString({ all: true, warnings: false, errors: false }))

        logger.log('\nCompiled successfully!\n')
      }
      if (isSuccessful && isFirstCompile) {
        logger.log(`You can now view your app in the browser at https://localhost:${PORT}/`)
      }
      isFirstCompile = false

      // If errors exist, only show errors.
      if (statsData.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (statsData.errors.length > 1) {
          statsData.errors.length = 1
        }
        logger.log('\n*** Failed to compile. ***\n')
        logger.log(statsData.errors.join('\n\n'))
        logger.log('\n\n\tReview the above errors to fix the build.\n')
        return
      }

      // Show warnings if no errors were found.
      if (statsData.warnings.length) {
        logger.log('\nCompiled with warnings.\n')
        logger.log(statsData.warnings.join('\n\n'))
      }
    })

    const devServer = new webpackDevServer(serverConfig, compiler)

    startServer(devServer)
    ;['SIGINT', 'SIGTERM'].forEach(function (sig) {
      process.on(sig, async function () {
        await devServer.stop(() => {
          process.exit()
        })
      })
    })
  }
}
