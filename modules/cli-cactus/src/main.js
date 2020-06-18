import chalk from 'chalk'
import execa from 'execa'
import Listr from 'listr'
import path from 'path'

const hygenFiles = async options => {
  await execa.command(
    `npx hygen templates ${options.template.toLowerCase()} --name ${
      options.targetDirectory
    } --directory ${process.cwd()}`,
    {
      cwd: options.templateDir,
    }
  )
  await execa.command(
    `npx hygen templates shared --name ${options.targetDirectory} --directory ${process.cwd()}`,
    {
      cwd: options.templateDir,
    }
  )
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  })
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'))
  }
  return
}

export async function createProject(options) {
  const currentFileUrl = import.meta.url
  const templateDir = path.resolve(new URL(currentFileUrl).pathname, '../../')
  options.templateDir = templateDir

  const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () => hygenFiles(options),
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git,
    },
    {
      title: 'Install dependencies',
      task: async () => await execa('yarn', { cwd: options.targetDirectory }),
    },
    {
      title: 'Initialize eslint config and dependencies',
      task: async () =>
        await execa('yarn', ['repay-eslint', 'install'], { cwd: options.targetDirectory }),
    },
  ])

  await tasks.run()
  console.log('%s Project ready', chalk.green.bold('DONE'))
  const folder = options.targetDirectory.split(/[/]+/).pop()
  console.log('cd %s', chalk.blue.bold(folder))
  console.log('yarn start')

  return true
}
