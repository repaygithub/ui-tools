#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

const args = [...process.argv].slice(2)
const cwd = process.cwd()
const isForce = args.includes('--force')
let filesExisting = false

if (args.includes('install')) {
  // add .eslintrc
  const eslintConfig = args.includes('--ts')
    ? fs.readFileSync(path.join(__dirname, './.eslintrcts.template'))
    : fs.readFileSync(path.join(__dirname, './.eslintrc.template'))
  const eslintPath = path.join(cwd, '.eslintrc')
  if (isForce || !fs.existsSync(eslintPath)) {
    fs.writeFileSync(eslintPath, eslintConfig)
  } else {
    filesExisting = true
    console.log('\n.eslintrc already exists in the root directory, delete or re-run with `--force`')
  }

  // install peer dependencies
  const pkg = require('./package.json')
  const peerDeps = Object.keys(pkg.peerDependencies).join(' ')
  if (fs.existsSync(path.join(cwd), 'yarn.lock')) {
    execSync(`yarn add --dev ${peerDeps}`, { cwd })
  } else {
    execSync(`npm install --save-dev ${peerDeps}`, { cwd })
  }

  console.log(`
  ${
    filesExisting
      ? 'See above for the issue installing the configs'
      : 'Successfully installed the configuratiions'
  }
  Successfully installed the peer dependencies.
  `)
}
