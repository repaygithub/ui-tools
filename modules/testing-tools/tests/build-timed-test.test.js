const buildTimedTest = require('../src/build-timed-test')
const { performance } = require('perf_hooks')

const getMockTest = expectedTime => {
  const mockTest = async (testName, testFunc) => {
    await testFunc()
    expect(console.log).toHaveBeenCalledWith(`Test '${testName}' took ${expectedTime}`)
  }
  mockTest.before = beforeFn => {
    beforeFn()
    return mockTest
  }
  mockTest.after = afterFn => {
    afterFn()
    return mockTest
  }
  return mockTest
}

beforeEach(() => {
  console.log = jest.fn()
})

describe('Timed Test Builder', () => {
  test('should call before', async () => {
    global.test = getMockTest('0:00')
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
    global.test = getMockTest('0:00')
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
    global.test = getMockTest('0:00')
    const runTest = buildTimedTest()
    const testFn = jest.fn(async () => {
      // do nothing
    })
    await runTest('Test-ception', testFn)
    expect(testFn).toHaveBeenCalled()
  })
  test('should take 2 seconds', async () => {
    global.test = getMockTest('0:02')
    performance.now = jest
      .fn()
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(2000)
    const runTest = buildTimedTest()
    const testFn = jest.fn(async () => {
      // do nothing
    })
    await runTest('Test-ception', testFn)
  })
})
