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
    console.log(watcher)
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
