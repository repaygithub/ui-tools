const TestSetup = require('../test-setup')

beforeEach(() => jest.setTimeout(1000 * 60 * 5))

describe('@repay/repay-scripts', () => {
  it('should build a library with svgs', async () => {
    const test = new TestSetup('library-with-svgs')
    await test.setup()

    const pkg = JSON.parse(await test.readFile('package.json'))
    await test.exec(`yarn repay-scripts build --lib index.js`)
    // relative svg import should be correct and absolute is unchanged
    expect(await test.readFile(pkg.module)).toMatchSnapshot()
  })
})
