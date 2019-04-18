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
  --config, -c   path to override configuration         [string] [default: null]
  --debug        adds extra logging for debugging purposes
                                                      [boolean] [default: false]
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```

### Using `config` option

The config options is passed a file which should export a single function as the `module.exports` which will be called with the pre-made configuration and the options provided to `repay-scripts` as the arguments, and must return a configuration.

#### web app example

```
# shell command
repay-scripts dev --config webpack.config.js src/index.js
```

```js
// webpack.config.js
module.exports = (config, options) => {
  // access options to determine what changes to make
  if (options.command === "dev") {
    config.performance = { hints: false };
  }
  // returns config whether modified or not
  return config;
};
```

#### library example

```
# shell command
repay-scripts dev --config rollup.config.js --lib src/index.ts
```

```js
// rollup.config.js
module.exports = (config, options) => {
  // remove ESM build
  config.outputs.splice(0, 1);
  // allways returns config
  return config;
};
```

### Optimizing Bundles

When generating bundles for client facing applications, it's ideal to take libraries used and host them in a separate "vendor" or "common" bundle. This bundle can be cached between releases when the libraries are not upgraded. Here is an example implementation when using `@repay/scripts` and the `config` option.

```js
// repay-scripts.config.js
module.exports = (baseConfig, options) => {
  if (options.env === "production") {
    // adds library bundles for cactus and react libraries
    baseConfig.optimization.splitChunks.cacheGroups = {
      cactus: {
        // Doesn't include node_modules because of yarn workspaces
        // symlinking. It normally should include node_modules like
        // react below
        test: /[\\/]node_modules[\\/]cactus-/,
        name: "cactus",
        chunks: "all"
      },
      react: {
        // selects both react and react-dom into a separate bundle
        test: /[\\/]node_modules[\\/]react(-dom)?[\\/]/,
        name: "react",
        chunks: "all"
      }
    };
  }
  return baseConfig;
};
```
