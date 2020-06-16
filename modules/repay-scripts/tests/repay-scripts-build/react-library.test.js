const TestSetup = require('../test-setup')
const React = require('react')
const ReactDomServer = require('react-dom/server')
const fs = require('fs')
const path = require('path')

beforeEach(() => jest.setTimeout(1000 * 60 * 5))

describe('@repay/repay-scripts', () => {
  it('should build the React library as commonjs', async () => {
    const test = new TestSetup('react-library')
    await test.setup()
    await test.exec(`yarn repay-scripts build --lib index.js`)
    // add react to allow render below
    await test.yarnAdd('react')
    const { App } = require(test.tempDir)
    const content = ReactDomServer.renderToStaticMarkup(
      React.createElement(App, {}, 'Rendered content')
    )
    expect(content).toMatchSnapshot()
  })

  it('should build the React library as esmodules', async () => {
    const test = new TestSetup('react-library')
    // application to install and run library
    const application = new TestSetup('react-application')

    await Promise.all([test.setup(), application.setup()])
    await test.exec(`yarn repay-scripts build --lib index.js`)
    await Promise.all([application.yarnAdd(test.tempDir), application.updateFile('app.js')])
    await application.exec(`yarn repay-scripts build index.js`)

    // Spin up test application
    application.startServer()
    const page = await test.getPage()
    await page.goto('http://localhost:8100')
    // wait for react-library className
    const content = await page.$eval('.AppWrapper', (el) => el.parentElement.outerHTML)
    expect(content).toMatchSnapshot()
  })

  it('should accept --tree-shaking', async () => {
    const test = new TestSetup('react-library')
    // application to install and run library
    const application = new TestSetup('react-application')

    await Promise.all([test.setup(), application.setup()])
    await test.exec(`yarn repay-scripts build --lib --tree-shaking index.js`)
    await fs.existsSync(path.join(test.tempDir, 'build/app.js'))
    await Promise.all([application.yarnAdd(test.tempDir), application.updateFile('app.js')])
    await application.exec(`yarn repay-scripts build index.js`)

    // Spin up test application
    application.startServer()
    const page = await test.getPage()
    await page.goto('http://localhost:8100')
    // wait for react-library className
    const content = await page.$eval('.AppWrapper', (el) => el.parentElement.outerHTML)
    expect(content).toContain('Updated Text')
  })
})
