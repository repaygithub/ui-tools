# `@repay/testing-tools`

This module exports tools to help test front-end applications

# CLI

Command Line Interface that may be used to run end-to-end tests.

## Commands

### `run-ete-tests`

The `run-ete-tests` command will run through your project's TestCafe test suite using the browsers you provide with little setup.

### Options

| Option                | Alias | Required (y\n) | Description                                                                 |
| --------------------- | ----- | -------------- | --------------------------------------------------------------------------- |
| --src                 | -s    | n              | The glob path pattern to your end-to-end test files.                        |
| --assertionTimeout    | -at   | n              | The timeout (in milliseconds) for TestCafe assertions. Defaults to 15000.   |
| --selectorTimeout     | -st   | n              | The timeout (in milliseconds) for TestCafe selectors. Defaults to 15000.    |
| --fixture             | -f    | n              | A specific fixture to run tests for.                                        |
| --browser             | -b    | y              | Browsers to run tests through. Browserstack browsers are supported via [testcafe-browser-provider-browserstack](https://github.com/DevExpress/testcafe-browser-provider-browserstack). |

### Example Usage

`testing-tools run-ete-tests --src tests/**/*.test.ts -at 20000 -st 20000 --browser chrome --browser browserstack:IE@11:Windows 10`

# JavaScript Functions

Exported JS helpers that you can use in your test code
### `buildTimedTest`

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
