const TestSetup = require('../test-setup')

beforeEach(() => jest.setTimeout(1000 * 60 * 5))

const sleep = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
  })
}

describe('@repay/repay-scripts', () => {
  let test

  beforeEach(() => {
    test = new TestSetup('basic-library')
  })

  afterEach(async () => {
    await test.cleanup()
    test = undefined
  })

  it('should watch a basic library for local development', async () => {
    await test.setup()
    const pkg = JSON.parse(await test.readFile('package.json'))
    test.spawn('yarn', ['repay-scripts', 'dev', '--lib', 'index.js'])
    await test.waitForText(pkg.module)
    await sleep(0.5)
    expect(await test.readFile(pkg.module)).toMatchSnapshot()
    await test.updateFile('app.js')
    await test.waitForText(pkg.module, 2)
    await sleep(0.5)
    expect(await test.readFile(pkg.module)).toMatchSnapshot()
  })
})
