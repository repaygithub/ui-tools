const convertMilliseconds = require('../src/utils/convert-milliseconds')

describe('Millisecond to minutes/seconds converter', () => {
  test('should yield 0:00', () => {
    const result = convertMilliseconds(0)
    expect(result).toEqual('0:00')
  })
  test('should yield 0:01', () => {
    const result = convertMilliseconds(1000)
    expect(result).toEqual('0:01')
  })

  test('should yield 1:00', () => {
    const result = convertMilliseconds(60000)
    expect(result).toEqual('1:00')
  })

  test('should yield 0:40', () => {
    const result = convertMilliseconds(40000)
    expect(result).toEqual('0:40')
  })

  test('should yield 1:40', () => {
    const result = convertMilliseconds(100000)
    expect(result).toEqual('1:40')
  })
})
