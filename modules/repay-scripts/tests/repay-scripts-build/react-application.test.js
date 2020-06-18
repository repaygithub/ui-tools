const TestSetup = require('../test-setup')

beforeEach(() => jest.setTimeout(1000 * 60 * 5))

describe('@repay/repay-scripts', () => {
  it('should build a React application', async () => {
    const test = new TestSetup('react-application')
    await test.setup()
    await test.exec(`yarn repay-scripts build index.js`)

    test.startServer()
    const page = await test.getPage()
    await page.goto('http://localhost:8100')
    const content = await page.$eval('.react-root', (el) => el.parentElement.outerHTML)
    expect(content).toMatchSnapshot()
  })
})
