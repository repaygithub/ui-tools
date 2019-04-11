'use strict'

const factory = require('yargs/yargs')
const repayScripts = require('./repay-scripts')
const fs = require('fs')
const path = require('path')

module.exports = cli

function cli(cwd) {
  const parser = factory(null, cwd)

  parser.alias('h', 'help')
  parser.alias('v', 'version')
  parser.demandCommand(1, 'You must provide a command.')

  parser.options({
    lib: {
      type: 'boolean',
      description: 'is this a javascript library',
      default: false,
    },
    'babel-env': {
      type: 'string',
      description: 'set the babel environment',
      default: 'production',
      choices: ['development', 'test', 'production'],
    },
    config: {
      type: 'string',
      alias: 'c',
      description: 'path to override configuration',
      default: null,
      requiresArg: true,
    },
    debug: {
      type: 'boolean',
      description: 'adds extra logging for debugging purposes',
      default: false,
    },
  })

  parser.command(
    'build <entry>',
    'build a javascript library or front-end application',
    () => {},
    argv => repayScripts(parseToConfig(argv))
  )

  parser.command(
    'dev <entry>',
    'build a javascript library or front-end application for local development',
    () => {
      return parser.option('port', {
        type: 'integer',
        alias: 'p',
        description: 'port for local development.',
        default: 3434,
        requiresArgs: true,
      })
    },
    argv => repayScripts(parseToConfig(argv))
  )

  return parser
}

function parseToConfig(argv) {
  const cwd = process.cwd()
  let config = argv.config

  if (argv.config !== null) {
    const configPath = path.resolve(argv.config)
    if (fs.existsSync(configPath)) {
      config = configPath
    } else {
      throw Error(`Could not find config ${argv.config}`)
    }
  }

  if (argv['babel-env']) {
    process.env.BABEL_ENV = argv['babel-env']
  }

  return {
    babelEnv: argv['babel-env'],
    command: argv._[0],
    config,
    cwd,
    port: argv.port,
    debug: argv.debug,
    entry: argv.entry,
    lib: argv.lib,
  }
}
