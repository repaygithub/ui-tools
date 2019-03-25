const TestSetup = require('../test-setup')
const https = require('https')
const unsecureGet = url =>
  new Promise((resolve, reject) => {
    let req = https.request(
      url,
      {
        method: 'GET',
        rejectUnauthorized: false,
      },
      res => {
        let rawData = ''
        res.on('data', chunk => (rawData += chunk))
        res.on('end', () => resolve(rawData))
      }
    )
    req.on('error', reject)
    req.end()
  })

beforeEach(() => jest.setTimeout(1000 * 60 * 5))

const sleep = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
  })
}

describe('@repay/repay-scripts', () => {
  let test

  beforeEach(() => {
    test = new TestSetup('web-application')
  })

  afterEach(async () => {
    await test.cleanup()
    test = undefined
  })

  /**
   * TODO: currently skipped because it's not a valid test and so is flakey
   * Needs to be a get via a browser that waits for some content on screen instead
   */

  it.skip('should build a web application for local development', async () => {
    await test.setup()
    test.spawn('yarn', ['repay-scripts', 'dev', '--babel-env', 'production', 'index.js'])
    await test.waitForText('Compiled successfully.')
    await sleep(2)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    const htmlContent = await unsecureGet('https://localhost:3434')
    const jsFile = htmlContent.match(/src=["'](.+)['"]/)[1]
    // validate source map because webpack adds absolute file paths in js which are dynamic here
    const mapContent = await unsecureGet(`https://localhost:3434${jsFile}.map`)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1'
    expect(htmlContent).toMatchSnapshot()
    expect(mapContent).toMatchSnapshot()
  })
})
