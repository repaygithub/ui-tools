# `@repay/testing-tools`

This module exports tools to help test front-end applications

## `buildTimedTest`

The `buildTimedTest` function is a wrapper for TestCafe that records the time that a given test takes to complete
and logs the time taken in the console, to help track an application's performance.

This function accepts one object argument with the following properties:

| Name   | Required (y/n) | Description                                                                              |
| ------ | -------------- | ---------------------------------------------------------------------------------------- |
| before | n              | A function to be called before the test runs, usually to do some setup operations        |
| after  | n              | A function to be called after the test completes, usually to to some teardown operations |

### Example Usage

```js
import { buildTimedTest } from '@repay/testing-tools'

const before = async (t) => {
  // Some setup...
}
const after = async (t) => {
  // Some after
}

const timedTest = buildTimedTest({ before, after })
timedTest('My Timed Test', async (t) => {
  // Test code
})
```
