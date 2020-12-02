import arg from 'arg'

import runEteTests from './run-ete-tests'

const parseArgs = (rawArgs) => {
  const args = arg(
    {
      '--src': String,
      '-s': '--src',
      '--assertionTimeout': Number,
      '-at': '--assertionTimeout',
      '--selectorTimeout': Number,
      '-st': '--selectorTimeout',
      '--fixture': String,
      '-f': '--fixture',
      '--browser': [String],
      '-b': '--browser',
    },
    { args: rawArgs.slice(2) }
  )
  return {
    command: args._[0],
    src: args['--src'],
    assertionTimeout: args['--assertionTimeout'],
    selectorTimeout: args['--selectorTimeout'],
    fixture: args['--fixture'],
    browsers: args['--browser'],
  }
}

export default async (args) => {
  let opts = parseArgs(args)
  if (opts.command === 'run-ete-tests') {
    await runEteTests(
      opts.browsers,
      opts.src,
      opts.assertionTimeout,
      opts.selectorTimeout,
      opts.fixture
    )
  }
}
