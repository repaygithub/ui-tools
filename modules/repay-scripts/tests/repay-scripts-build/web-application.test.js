const TestSetup = require('../test-setup')

beforeEach(() => jest.setTimeout(1000 * 60 * 5))

describe('@repay/repay-scripts', () => {
  it('should build a web application', async () => {
    const test = new TestSetup('web-application')
    await test.setup()
    await test.exec(`yarn repay-scripts build --babel-env test src/index.js`)

    test.startServer()
    const page = await test.getPage()
    await page.goto('http://localhost:8100')
    const content = await page.$eval('.app-root', (el) => el.outerHTML)
    expect(content).toMatchSnapshot()
  })

  it('should build a web application using a custom index.html passed from CLI', async () => {
    const test = new TestSetup('web-application')
    await test.setup()
    await test.exec(
      'yarn repay-scripts build --html-template src/index.html --babel-env test src/index.js'
    )

    test.startServer()
    const page = await test.getPage()
    await page.goto('http://localhost:8100')
    const content = await page.$eval("head > meta[name='viewport']", (el) => el.content)
    expect(content).toBe('test')
  })

  it('should build a web application using a custom index.html found in the default location', async () => {
    const test = new TestSetup('web-application')
    await test.setup()
    await test.exec('yarn repay-scripts build --babel-env test src/index.js')

    test.startServer()
    const page = await test.getPage()
    await page.goto('http://localhost:8100')
    const content = await page.$eval("head > meta[name='viewport']", (el) => el.content)
    expect(content).toBe('test')
  })
})
