# `@repay/babel-preset`

Babel preset used by [@repaygithub](https://github.com/repaygithub/)

## Usage

Install via the command line using yarn or npm

> `@babel/core`, `@babel/runtime`, and `core-js` are peer dependencies, which means you must install them yourself.

```bash
yarn add --dev @repay/babel-preset @babel/core @babel/runtime core-js
# OR
npm install --save-dev @repay/babel-preset @babel/core @babel/runtime core-js
```

Add the preset to your .babelrc or equivalent

```.babelrc
{
  "presets": ["@repay/babel-preset"]
}
```

## EcmaScript Features Supported

- All Proposals that have reached stage-4 and are implemented by `@babel/preset-env`
- Class Properties (does not include private fields)

  ```jsx
  class Accordian extends Component {
    state = { isOpen: this.props.openOnMount || false };

    // using assignment like below,
    // `this` references the class instance always
    toggleOpen = () =>
      this.setState(s => {
        isOpen: !s.isOpen;
      });
  }
  ```

- Object rest spread (e.g. `let obj = {...props}`)

## Polyfills

There are two options you can pass to control polyfills:

- `coreJsPolyfill` (default: `false`): When this option is `true`, the [`useBuiltIns: 'usage'`](https://babeljs.io/docs/en/babel-preset-env#usebuiltins-usage) option will be passed into `@babel/preset-env` to automatically
add in only the necessary CoreJS polyfills needed.
- `regeneratorPolyfill` (default: `false`): When this option is `true`, the [`regenerator: true`](https://babeljs.io/docs/en/babel-plugin-transform-runtime#regenerator) option will be passed into the `@babel/plugin-transform-runtime` plugin.
