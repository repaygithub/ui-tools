# 🔨 UI Tools

[![CircleCI](https://circleci.com/gh/repaygithub/ui-tools.svg?style=svg)](https://circleci.com/gh/repaygithub/ui-tools)

Generic tooling used throughout front-end development at REPAY.

## Getting Started

This repository uses [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) for package management. The most recent version of Yarn is recommended and be downloaded by following the instructions [on their website](https://yarnpkg.com/en/docs/install).

After you have successfully installed Yarn, install dependencies normally using the following command at the root directory of this repository:

```bash
yarn install
```

You should then run the tests to ensure you are started in a clean state:

```bash
yarn test
```

Now you can begin development. There is some risk that `yarn link` outside this directory will not work as expected due to the structure of workspaces: if you have issues, install directly using a relative path and re-install after changes are made.

## Packages

Packages all exist in the `modules/` folder, (using modules allows better autocomplete from terminal over packages).

- [`@repay/eslint-config`](./modules/eslint-config)
- [`@repay/babel-preset`](./modules/babel-preset)
- [`@repay/scripts`](./modules/repay-scripts)
