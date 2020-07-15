# `@repay/scripts`

The CLI tools used for building and bundling javascript packages at REPAY. Uses the [`@repay/babel-preset`](../babel-preset/), overrides not currently available except through customizing the config.

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
  --lib                is this a javascript library   [boolean] [default: false]
  --babel-env          set the babel environment
               [string] [choices: "development", "test", "production"] [default:
                                                                   "production"]
  --config, -c         path to override configuration   [string] [default: null]
  --debug              adds extra logging for debugging purposes
                                                      [boolean] [default: false]
  --tree-shaking       enables treeshaking for libraries
                                                      [boolean] [default: false]
  --watch              applies to "build" only - watches files and rebuilds on
                       change                         [boolean] [default: false]
  --html-template, -t  applies to front-end apps only - passes custom index.html
                       template to html-webpack-plugin
                                            [string] [default: "src/index.html"]
  -h, --help           Show help                                       [boolean]
  -v, --version        Show version number                             [boolean]
```

### Using the `tree-shaking` option

_Only applicable to libraries._

Adding the `--tree-shaking` option will create a commonjs bundle normally, but then use [Babel](https://babeljs.io/docs/en/) directly instead of bundling the ES modules. This allows for more aggressive tree shaking or code splitting when the library is used for the front-end. Additionally, the library should implement the [`sideEffects`](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free) property in it's package.json to allow bundlers to confidently remove unused files.

Example:

```sh
repay-scripts build --tree-shaking --lib src/index.ts
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
  // always return config
  return config;
};
```

### Using the `html-template` option

The `html-template` option is used to pass a custom HTML template to `html-webpack-plugin` if you need to include some customized configuration to your HTML.
This argument is only applicable to web applications -- not libraries. If no value is specified for this arg, the script will search for an `index.html` file under
the `src/` solder of your project and use that if one is found. If no custom HTML template is located or provided, a default template will be generated.

#### Example HTML Template

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>
```

### Optimizing Bundles

By default, `@repay/scripts` splits out the webpack runtime as a bundle to prevent unnecessary content hash updates. You can read more about the option [here](https://webpack.js.org/configuration/optimization/#optimizationruntimechunk).

When generating bundles for client facing applications, it's ideal to take libraries used and host them in a separate "vendor" or "common" bundle. This bundle can be cached between releases when the libraries are not upgraded. Here is an example implementation when using `@repay/scripts` and the `config` option.

```js
// repay-scripts.config.js
module.exports = (baseConfig, options) => {
  if (options.env === "production") {
    // adds library bundles for cactus and react libraries
    baseConfig.optimization.splitChunks.cacheGroups = {
      cactus: {
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

You can learn more about the `splitChunks` object and options in the [webpack docs](https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks).
