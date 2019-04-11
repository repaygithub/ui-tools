const TestSetup = require('../test-setup')

beforeEach(() => jest.setTimeout(1000 * 60 * 5))

describe('@repay/repay-scripts', () => {
  it('should host a react application for local development', async () => {
    const test = new TestSetup('react-application')
    await test.setup()
    test.spawn('yarn', [
      'repay-scripts',
      'dev',
      '--babel-env',
      'production',
      'index.js',
      '--port',
      '9696',
    ])

    await test.waitForText('Compiled successfully')
    const page = await test.getPage()
    await page.goto('https://localhost:9696')
    const content = await page.$eval('.react-root', el => el.parentElement.outerHTML)
    expect(content).toMatchSnapshot()
  })
})
