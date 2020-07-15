const { performance } = require('perf_hooks')
const convertMilliseconds = require('./utils/convert-milliseconds')

const buildTimedTest = (options) => {
  const timedTest = (testName, testFunc) => {
    const timedTestFunc = wrapTestFunc(testName, testFunc)
    let testInstance = test
    if (options && options.before) {
      testInstance = testInstance.before(options.before)
    }
    if (options && options.after) {
      testInstance = testInstance.after(options.after)
    }
    testInstance(testName, timedTestFunc)
  }
  return timedTest
}

const wrapTestFunc = (testName, testFunc) => {
  return async (t) => {
    const t0 = performance.now()
    await testFunc(t)
    const t1 = performance.now()
    const timeTaken = convertMilliseconds(t1 - t0)
    console.log(`Test '${testName}' took ${timeTaken}`)
  }
}

module.exports = buildTimedTest
