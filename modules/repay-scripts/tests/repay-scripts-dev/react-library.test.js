const TestSetup = require('../test-setup')
const ReactDomServer = require('react-dom/server')
const React = require('react')

beforeEach(() => jest.setTimeout(1000 * 60 * 5))

const sleep = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

describe('@repay/repay-scripts', () => {
  it('should watch a React library for local development', async () => {
    const test = new TestSetup('react-library')
    await test.setup()
    const pkg = JSON.parse(await test.readFile('package.json'))
    test.spawn('yarn', ['repay-scripts', 'dev', '--lib', 'index.js'])
    await test.waitForText(pkg.module)
    await test.yarnAdd('react')
    const { App } = require(test.tempDir)
    const content = ReactDomServer.renderToStaticMarkup(
      React.createElement(App, {}, 'Rendered content')
    )
    expect(content).toMatchSnapshot()

    await test.updateFile('app.js')
    await test.waitForText(pkg.module, 2)
    await sleep(0.5)

    jest.resetModules()

    const { App: UpdatedApp } = require(test.tempDir)
    const updatedContent = ReactDomServer.renderToStaticMarkup(
      React.createElement(UpdatedApp, {}, 'Rendered content')
    )
    expect(updatedContent).toMatchSnapshot()
  })

  it('should watch the React library as esmodules with tree-shaking', async () => {
    const test = new TestSetup('react-library')
    // application to install and run library
    const application = new TestSetup('react-application')

    await Promise.all([test.setup(), application.setup()])

    test.spawn('yarn', ['repay-scripts', 'dev', '--lib', '--tree-shaking', 'index.js'])
    // some things we can try to run in parallel
    await Promise.all([
      test.waitForText('finished transpiling individual files'),
      application.yarnAdd(test.tempDir),
      application.updateFile('app.js'),
      // needs config to resolve react for library
      application.writeFile(
        'repay-scripts.config.js',
        `
module.exports = function (config) {
  config.resolve.alias.react = require.resolve('react')
  return config
}
`
      ),
      test.exec('yarn link'),
    ])

    await application.exec('yarn link @repay/basic-library')
    await test.updateFile('app.js')
    await test.waitForText('updated files:')

    application.spawn('yarn', [
      'repay-scripts',
      'dev',
      '--babel-env',
      'production',
      '--config',
      'repay-scripts.config.js',
      '--port',
      '9444',
      'index.js',
    ])

    await application.waitForText('Compiled successfully')

    // Spin up test application
    const page = await test.getPage()
    await page.goto('https://localhost:9444')
    // wait for react-library className
    await sleep(2)
    const content = await page.$eval('.AppWrapper.Updated', (el) => el.parentElement.outerHTML)
    expect(content).toMatchSnapshot()
    await test.exec('yarn unlink')
  })
})
