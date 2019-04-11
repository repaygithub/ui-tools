const TestSetup = require('../test-setup')
const React = require('react')
const ReactDomServer = require('react-dom/server')

beforeEach(() => jest.setTimeout(1000 * 60 * 5))

describe('@repay/repay-scripts', () => {
  it('should build a React library', async () => {
    debugger
    const test = new TestSetup('react-library')
    await test.setup()
    await test.exec(`yarn repay-scripts build --lib index.js`)
    await test.yarnAdd('react')
    const { App } = require(test.tempDir)
    const content = ReactDomServer.renderToStaticMarkup(
      React.createElement(App, {}, 'Rendered content')
    )
    expect(content).toMatchSnapshot()
  })
})
