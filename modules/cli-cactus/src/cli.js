import { createProject } from './main'
import arg from 'arg'
import inquirer from 'inquirer'

const parseArgs = (rowArgs) => {
  const args = arg(
    {
      '--git': Boolean,
      '-g': '--git',
      '--javascript': Boolean,
      '--typescript': Boolean,
    },
    {
      args: rowArgs.slice(2),
    }
  )
  return {
    targetDirectory: args._[0],
    git: args['--git'] || false,
    template: getTemplateName(args),
  }
}

const getTemplateName = (val) => {
  if (val['--typescript']) {
    return 'typescript'
  } else if (val['--javascript']) {
    return 'javascript'
  } else return false
}

const validateName = (input) => {
  if (!input) {
    return false
  } else if (['/', '\\'].some((el) => input.includes(el)) || !input) {
    return false
  }
  return true
}

async function promptForMissingOptions(options) {
  const defaultTemplate = 'JavaScript'
  const questions = []
  if (!validateName(options.targetDirectory)) {
    questions.push({
      type: 'input',
      name: 'targetDirectory',
      message: 'Please provide a name for your app',
      validate: (e) => validateName(e),
    })
  }
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
    targetDirectory: answers.targetDirectory || options.targetDirectory,
  }
}

export const cli = async (args) => {
  let options = parseArgs(args)
  options = await promptForMissingOptions(options)
  await createProject(options)
}
