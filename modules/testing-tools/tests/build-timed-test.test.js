const buildTimedTest = require('../src/build-timed-test')

const mockTest = (testName, testFunc) => {
  testFunc()
  return {
    before: beforeFn => beforeFn(),
    after: afterFn => afterFn(),
  }
}

beforeEach(() => {
  global.test = mockTest
  console.log = jest.fn()
})

describe('Timed Test Builder', () => {
  test('should call before', async () => {
    const beforeFn = jest.fn(async () => {
      // do nothing
    })
    const runTest = buildTimedTest({ before: beforeFn })
    await runTest('Test-ception', async () => {
      // do nothing
    })
    expect(beforeFn).toHaveBeenCalled()
  })
  test('should call after', async () => {
    const afterFn = jest.fn(async () => {
      // do nothing
    })
    const runTest = buildTimedTest({ after: afterFn })
    await runTest('Test-ception', async () => {
      // do nothing
    })
    expect(afterFn).toHaveBeenCalled()
  })
  test('should call test function', async () => {
    const runTest = buildTimedTest()
    const testFn = jest.fn(async () => {
      // do nothing
    })
    await runTest('Test-ception', testFn)
    expect(testFn).toHaveBeenCalled()
  })
})
