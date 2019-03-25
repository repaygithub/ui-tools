const TestSetup = require('../test-setup')

beforeEach(() => jest.setTimeout(1000 * 60 * 5))

describe('@repay/repay-scripts', () => {
  it('should build a web application', async () => {
    const test = new TestSetup('web-application')
    await test.setup()
    await test.exec(`yarn repay-scripts build --babel-env test index.js`)
    let generatedFiles = await test.readdir('dist')
    let bundleFile = generatedFiles.find(f => f.endsWith('.js'))
    let mapFile = generatedFiles.find(f => f.endsWith('.js.map'))
    expect(generatedFiles).toMatchSnapshot()
    expect(await test.readFile('dist/index.html')).toMatchSnapshot()
    expect(await test.readFile(`dist/${bundleFile}`)).toMatchSnapshot()
    expect(await test.readFile(`dist/${mapFile}`)).toMatchSnapshot()
  })
})
