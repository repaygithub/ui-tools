const TestSetup = require('../test-setup')

beforeEach(() => jest.setTimeout(1000 * 60 * 5))

describe('@repay/repay-scripts', () => {
  it('should build a web application for local development', async () => {
    const test = new TestSetup('web-application')
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
    const content = await page.$eval('.app-root', (el) => el.outerHTML)
    expect(content).toMatchSnapshot()
  })

  it('should build a web application for local development using a custom index.html', async () => {
    const test = new TestSetup('web-application')
    await test.setup()
    test.spawn('yarn', [
      'repay-scripts',
      'dev',
      '--babel-env',
      'production',
      'index.js',
      '--port',
      '9696',
      '-t',
      'index.html',
    ])
    await test.waitForText('Compiled successfully')
    const page = await test.getPage()
    await page.goto('https://localhost:9696')
    const content = await page.$eval("head > meta[name='viewport']", (el) => el.content)
    expect(content).toBe('test')
  })
})
