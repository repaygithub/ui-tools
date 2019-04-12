'use strict'

const build = require('./commands/build')
const dev = require('./commands/dev')

module.exports = repayScripts

async function repayScripts(options) {
  const command = options.command
  if (options.debug) {
    console.log('running command ', command)
    console.log(options)
  }
  switch (command) {
    case 'build': {
      options.env = 'production'
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
