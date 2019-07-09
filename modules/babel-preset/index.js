module.exports = function babelPreset(api) {
  const isEnvProduction = api.env('production')
  const isEnvTest = api.env('test')
  const isEnvDevelopment = api.env('development') || (!isEnvProduction && !isEnvTest)
  return {
    presets: [
      isEnvTest && [
        // ES features necessary for user's Node version
        require('@babel/preset-env').default,
        {
          targets: {
            node: 'current',
          },
        },
      ],
      (isEnvProduction || isEnvDevelopment) && [
        // Latest stable ECMAScript features
        require('@babel/preset-env').default,
        {
          targets: {
            ie: 11,
          },
          // Users cannot override this behavior because this Babel
          // configuration is highly tuned for ES5 support
          ignoreBrowserslistConfig: true,
          // Don't include core-js, users should import @babel/polyfill themselves
          useBuiltIns: false,
          // Do not transform modules to CJS
          modules: false,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      [
        require('@babel/preset-react').default,
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: isEnvDevelopment || isEnvTest,
          // Will use the native built-in instead of trying to polyfill
          // behavior for any plugins that require one.
          useBuiltIns: true,
        },
      ],
      [
        require('@babel/preset-typescript').default,
        {
          isTSX: true,
          allExtensions: true,
        },
      ],
    ].filter(Boolean),
    plugins: [
      // Necessary to include regardless of the environment because
      // in practice some other transforms (such as object-rest-spread)
      // don't work without it: https://github.com/babel/babel/issues/7215
      require('@babel/plugin-transform-destructuring').default,
      [
        require('@babel/plugin-proposal-class-properties').default,
        {
          loose: true,
        },
      ],
      [
        require('@babel/plugin-proposal-object-rest-spread').default,
        {
          useBuiltIns: true,
        },
      ],
      // addes dynamic import syntax
      require('@babel/plugin-syntax-dynamic-import').default,
      isEnvTest && require('babel-plugin-dynamic-import-node').default,
    ].filter(Boolean),
  }
}
