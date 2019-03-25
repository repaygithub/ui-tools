const TestSetup = require('../test-setup')

beforeEach(() => jest.setTimeout(1000 * 60 * 5))

describe('@repay/repay-scripts', () => {
  it('should build a basic library', async () => {
    const test = new TestSetup('basic-library')
    await test.setup()
    const pkg = JSON.parse(await test.readFile('package.json'))
    await test.exec(`yarn repay-scripts build --lib index.js`)
    expect(await test.readFile(pkg.main)).toMatchSnapshot()
    expect(await test.readFile(pkg.module)).toMatchSnapshot()
  })
})
