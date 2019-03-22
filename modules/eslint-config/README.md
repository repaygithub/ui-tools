# `@repay/eslint-config`

The eslint-config used at REPAY.

## Usage

To use this configuration you will need to follow three steps:

1. install this package via your package manager of choice  
   `yarn add -D @repay/eslint-config eslint`
1. install the peer dependencies and configurations  
   `yarn repay-eslint install`

To run the linter you should add a "script" to the root `package.json` such as:

```
{
  "scripts": {
    "lint": "eslint \"**/*.{js,jsx}\"",
    "fmt": "yarn lint --fix"
  }
}
```

You will then be able to run the linter using the command: `yarn lint`. Adding the `--fix` argument will auto fix any issues which can be listed as `yarn fmt` above.

## Design Principles

The following priciples should be considered when adding rules.

- Stylistic options are limited to those exposed by Prettier to reduce bike-shedding
- Rules should be added with specific purpose in mind to avoid bloat
- Rules should be either `"error"` or `"off"` save for the following two exceptions:
  - very complex rules which are not always accurate
  - new rules that are added in a patch, which will be an error in the next minor version.
