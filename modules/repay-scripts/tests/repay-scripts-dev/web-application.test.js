const TestSetup = require('../test-setup')

describe('@repay/repay-scripts', () => {
  it('should build a web application for local development', async () => {
    const test = new TestSetup('web-application')
    await test.setup()
    test.spawn('yarn', [
      'repay-scripts',
      'dev',
      '--babel-env',
      'production',
      'src/index.js',
      '--port',
      '9696',
    ])

    await test.waitForText('Compiled successfully')
    const page = await test.getPage()
    await page.goto('https://localhost:9696')
    const content = await page.$eval('.app-root', (el) => el.outerHTML)
    expect(content).toMatchSnapshot()
  })

  it('should build a web application for local development using a custom index.html passed from CLI', async () => {
    const test = new TestSetup('web-application')
    await test.setup()
    test.spawn('yarn', [
      'repay-scripts',
      'dev',
      '--babel-env',
      'production',
      'src/index.js',
      '--port',
      '9696',
      '-t',
      'template.html',
    ])
    await test.waitForText('Compiled successfully')
    const page = await test.getPage()
    await page.goto('https://localhost:9696')
    const content = await page.$eval("head > meta[name='viewport']", (el) => el.content)
    expect(content).toBe('custom-location')
  })

  it('should build a web application for local development using a custom index.html found in the default location', async () => {
    const test = new TestSetup('web-application')
    await test.setup()
    test.spawn('yarn', [
      'repay-scripts',
      'dev',
      '--babel-env',
      'production',
      'src/index.js',
      '--port',
      '9696',
    ])
    await test.waitForText('Compiled successfully')
    const page = await test.getPage()
    await page.goto('https://localhost:9696')
    const content = await page.$eval("head > meta[name='viewport']", (el) => el.content)
    expect(content).toBe('test')
  })
})
