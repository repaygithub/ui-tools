import dotenv from 'dotenv'
import path from 'path'
import createTestCafe from 'testcafe'

dotenv.config({ path: 'dev.env' })
dotenv.config({ path: 'local.env' })

const runIndividualTest = async (
  browser,
  src,
  assertionTimeout,
  selectorTimeout,
  fixture,
  clientScripts
) => {
  const testcafe = await createTestCafe()
  try {
    let runner = testcafe.createRunner()
    const providedClientScripts = clientScripts.map((cs) => ({
      path: path.join(process.cwd(), cs),
    }))
    runner.clientScripts([
      { path: path.join(__dirname, '..', './testing-library-client-scripts/core.min.js') },
      { path: path.join(__dirname, '..', './testing-library-client-scripts/dom.js') },
      { path: path.join(__dirname, '..', './testing-library-client-scripts/matches-polyfill.js') },
      ...providedClientScripts,
    ])
    runner = src ? runner.src(src) : runner
    runner = fixture ? runner.filter((_, fixtureName) => fixtureName === fixture) : runner
    const numFailedTests = await runner.browsers(browser).run({ assertionTimeout, selectorTimeout })
    await testcafe.close()
    if (numFailedTests > 0) {
      process.exit(1)
    }
  } catch (e) {
    console.error(e)
    await testcafe.close()
    process.exit(1)
  }
}

const runEteTests = async (
  browsers,
  src,
  assertionTimeout = 15000,
  selectorTimeout = 15000,
  fixture,
  clientScripts
) => {
  for (const browser of browsers) {
    await runIndividualTest(browser, src, assertionTimeout, selectorTimeout, fixture, clientScripts)
  }
}

export default runEteTests
