const TestSetup = require('../test-setup')
const ReactDomServer = require('react-dom/server')
const React = require('react')

beforeEach(() => jest.setTimeout(1000 * 60 * 5))

const sleep = seconds => {
  return new Promise(resolve => {
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
})
