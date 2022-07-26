module.exports = function babelPreset(
  api,
  options = { coreJsPolyfill: false, regeneratorPolyfill: false, useHelpers: false }
) {
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
          // polyfills based on usage, otherwise assumes polyfills are provided
          ...(options.coreJsPolyfill
            ? { corejs: 3, useBuiltIns: 'usage' }
            : { useBuiltIns: false }),
          // Do not transform modules to CJS to allow code-splitting at bundling
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
      (isEnvProduction || isEnvDevelopment) && [
        require('@babel/plugin-transform-runtime').default,
        {
          // these polyfills are provided by @babel/preset-env or babel-polyfill
          corejs: false,
          // provides async support when auto polyfill is requested
          regenerator: options.regeneratorPolyfill,
          // avoids inlining helpers like _extend for smaller code size
          helpers: options.useHelpers,
          // smaller code size because no es module interop required
          useESModules: true,
        },
      ],
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
      [require('@babel/plugin-proposal-private-methods').default, { loose: true }],
      [
        require('@babel/plugin-proposal-object-rest-spread').default,
        {
          useBuiltIns: true,
        },
      ],
      // addes dynamic import syntax
      require('@babel/plugin-syntax-dynamic-import').default,
      isEnvTest && require('babel-plugin-dynamic-import-node').default,
      [
        require('babel-plugin-styled-components').default,
        {
          displayName: true,
          ssr: false,
          fileName: false,
          pure: true,
        },
      ],
      [require('@babel/plugin-proposal-private-property-in-object').default, { loose: true }],
    ].filter(Boolean),
  }
}
