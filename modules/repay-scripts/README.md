# `@repay/scripts`

The CLI tools used for building and bundling javascript packages at REPAY.

## Usage

Add `@repay/scripts` to your project with `yarn add --dev @repay/scripts`

### Web application

To run a web application with reloading, call the `dev` command with your entry file:

```js
// src/index.js
console.log("running");
```

In the command line:

```
repay-scripts dev src/index.js
```

Open your browser to https://localhost:3434

When development is finished, call the `build` command with your entry file to generate a distributable:

```
repay-scripts build src/index.js
```

## CLI Commands

Output from `repay-scripts --help`

```
repay-scripts <command>

Commands:
  repay-scripts build <entry>  build a javascript library or front-end
                               application
  repay-scripts dev <entry>    build a javascript library or front-end
                               application for local development

Options:
  --lib          is this a javascript library         [boolean] [default: false]
  --babel-env    set the babel environment
               [string] [choices: "development", "test", "production"] [default:
                                                                   "production"]
  --config, -c   path to override configuration (not supported with --lib)
                                                        [string] [default: null]
  --debug        adds extra logging for debugging purposes
                                                      [boolean] [default: false]
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```
