# 🔨 UI Tools

![](https://github.com/repaygithub/ui-tools/workflows/CI%20Pipeline/badge.svg)

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

### Commit Messages

We format commit messages according to a standard:

```
tag(module): write a short summary of changes made (start with verb)

Long description of changes, rationales, etc.

BREAKING CHANGE: Description of breaking changes, if any.

CACTUS-851
```

If the commit applies to the whole repo, you can omit the module & parens.
The one-line summary should be imperative tense (i.e. "add this", "set that", "fix the other").
Long description is optional, and can be multiple paragraphs if needed;
obviously if there are no breaking changes you don't have to describe them.
Only the tag, one-line summary, and ticket number are always required.

These are the tags:

| Tag name | Description |
| -------- | ----------- |
| feat     | A new feature                                                                                               |
| fix      | A bug fix                                                                                                   |
| docs     | Documentation only changes                                                                                  |
| style    | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |
| refactor | A code change that neither fixes a bug nor adds a feature                                                   |
| perf     | A code change that improves performance                                                                     |
| test     | Adding missing tests or correcting existing tests                                                           |
| build    | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |
| ci       | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| chore    | Other changes that don't modify src or test files                                                           |
| revert   | Reverts a previous commit                                                                                   |

## Packages

Packages all exist in the `modules/` folder, (using modules allows better autocomplete from terminal over packages).

- [`@repay/eslint-config`](./modules/eslint-config)
- [`@repay/babel-preset`](./modules/babel-preset)
- [`@repay/scripts`](./modules/repay-scripts)
- [`@repay/testing-tools`](./modules/testing-tools)
