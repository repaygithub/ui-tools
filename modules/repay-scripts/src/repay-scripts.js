'use strict'

const build = require('./commands/build')
const dev = require('./commands/dev')
const logger = require('./helpers/logger')

module.exports = repayScripts

async function repayScripts(options) {
  const command = options.command
  logger.debug('running command ', command)
  logger.debug(options)
  switch (command) {
    case 'build': {
      const isWatch = options.watch
      options.env = isWatch ? 'development' : 'production'
      await build(options)
      break
    }
    case 'dev': {
      options.env = 'development'
      await dev(options)
      break
    }
    default: {
      throw new Error(`Unknown command ${command}`)
    }
  }
}
