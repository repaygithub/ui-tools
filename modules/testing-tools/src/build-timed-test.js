const { performance } = require('perf_hooks')
const convertMilliseconds = require('./utils/convert-milliseconds')

const buildTimedTest = options => {
  const timedTest = (testName, testFunc) => {
    const timedTestFunc = wrapTestFunc(testName, testFunc)
    const testInstance = test(testName, timedTestFunc)
    if (options && options.before) {
      testInstance.before(options.before)
    }
    if (options && options.after) {
      testInstance.after(options.after)
    }
  }
  return timedTest
}

const wrapTestFunc = (testName, testFunc) => {
  return async t => {
    const t0 = performance.now()
    await testFunc(t)
    const t1 = performance.now()
    const timeTaken = convertMilliseconds(t1 - t0)
    console.log(`Test '${testName}' took ${timeTaken}`)
  }
}

module.exports = buildTimedTest
