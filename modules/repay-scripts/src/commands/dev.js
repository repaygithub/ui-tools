module.exports = dev

const getRollupConfig = require('../configs/rollup')
const getWebpackConfig = require('../configs/web')
const path = require('path')
const rollup = require('rollup')

const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const HOST = '0.0.0.0'

async function dev(options) {
  options.debug && console.log('building dev environment...')
  const input = path.resolve(options.cwd, options.entry)
  const isLibrary = options.lib
  if (isLibrary) {
    let config = getRollupConfig(input, options)
    if (options.config) {
      config = require(options.config)(config, options)
      options.debug && console.log('rollup configuration', config)
    }
    options.debug && console.log('building library...')
    let watcher = rollup.watch(config)
    watcher.on('event', event => {
      if (event.code === 'ERROR') {
        console.error('Error generating bundle')
        console.error(event.error)
      } else if (event.code === 'FATAL') {
        console.error(`\nFatal Rollup Error [${event.error.code}]`)
        console.error('\t' + event.error.toString() + '\n')
        process.exit(1)
      }
    })
  } else {
    const PORT = options.port
    let config = getWebpackConfig(input, options)
    let serverConfig = {
      port: PORT,
      clientLogLevel: 'error',
      contentBase: 'dist',
      quiet: true,
      compress: true,
      hot: true,
      inline: true,
      overlay: true,
      https: true,
      historyApiFallback: true,
      publicPath: '/',
    }
    if (options.config) {
      config.devServer = serverConfig
      config = require(options.config)(config, options)
      options.debug && console.log('webpack configuration', config)
      serverConfig = config.devServer
      delete config.devServer
    }
    const compiler = webpack(config)

    let isFirstCompile = true
    // shamelessly copied from react-dev-utils/WebpackDevServerUtils.js
    // "invalid" is short for "bundle invalidated", it doesn't imply any errors
    compiler.hooks.invalid.tap('invalid', () => {
      if (isFirstCompile === false) {
        console.log(`Compiling...`)
      } else {
        console.log('\n\nChanges detected, recompiling...')
      }
    })

    compiler.hooks.done.tap('done', async stats => {
      // We have switched off the default Webpack output in WebpackDevServer
      const statsData = stats.toJson({
        all: false,
        warnings: true,
        errors: true,
      })

      const isSuccessful = !statsData.errors.length && !statsData.warnings.length
      if (isSuccessful) {
        options.debug && console.log(stats.toString({ all: true, warnings: false, errors: false }))

        console.log('\nCompiled successfully!\n')
      }
      if (isSuccessful && isFirstCompile) {
        console.log(`You can now view your app in the browser at https://localhost:${PORT}/`)
      }
      isFirstCompile = false

      // If errors exist, only show errors.
      if (statsData.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (statsData.errors.length > 1) {
          statsData.errors.length = 1
        }
        console.log('\n*** Failed to compile. ***\n')
        console.log(statsData.errors.join('\n\n'))
        console.log('\n\n\tReview the above errors to fix the build.\n')
        return
      }

      // Show warnings if no errors were found.
      if (statsData.warnings.length) {
        console.log('\nCompiled with warnings.\n')
        console.log(statsData.warnings.join('\n\n'))
      }
    })

    const devServer = new webpackDevServer(compiler, serverConfig)
    devServer.listen(PORT, HOST, err => {
      if (err) {
        return console.log(err)
      }
      console.log('Building web application...')
    })
    ;['SIGINT', 'SIGTERM'].forEach(function(sig) {
      process.on(sig, function() {
        devServer.close(() => {
          process.exit()
        })
      })
    })
  }
}
