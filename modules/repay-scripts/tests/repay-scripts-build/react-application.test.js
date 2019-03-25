const TestSetup = require('../test-setup')

beforeEach(() => jest.setTimeout(1000 * 60 * 5))

describe('@repay/repay-scripts', () => {
  it('should build a React application', async () => {
    const test = new TestSetup('react-application')
    await test.setup()
    await test.exec(`yarn repay-scripts build index.js`)
    let generatedFiles = await test.readdir('dist')
    expect(generatedFiles).toMatchSnapshot()
    expect(await test.readFile('dist/index.html')).toMatchSnapshot()
    // expect(await test.readFile('dist/main.bundle.js')).toMatchSnapshot()
    // expect(await test.readFile('dist/main.bundle.js.map')).toMatchSnapshot()
  })
})
