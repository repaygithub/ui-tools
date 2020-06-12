import { createProject } from './main'
import arg from 'arg'
import inquirer from 'inquirer'

const parseArgs = rowArgs => {
  const args = arg(
    {
      '--install': Boolean,
      '--git': Boolean,
      '-g': '--git',
      '--yes': Boolean,
      '-i': '--install',
      '-y': '--yes',
    },
    {
      args: rowArgs.slice(2),
    }
  )
  return {
    skipPrompts: args['--yes'] || false,
    runInstall: args['--install'] || false,
    git: args['--git'] || false,
    template: args._[0],
  }
}

async function promptForMissingOptions(options) {
  const defaultTemplate = 'JavaScript'
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    }
  }

  const questions = []
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: ['JavaScript', 'TypeScript'],
      default: defaultTemplate,
    })
  }
  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: false,
    })
  }

  const answers = await inquirer.prompt(questions)
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
  }
}

export const cli = async args => {
  let options = parseArgs(args)
  options = await promptForMissingOptions(options)
  await createProject(options)
}
