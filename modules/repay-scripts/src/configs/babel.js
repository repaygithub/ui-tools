let presets = null

module.exports = function getBabelConfig() {
  if (presets === null) {
    presets = [
      [
        require.resolve('@repay/babel-preset'),
        // CoreJS manual included in webpack entry, as Babel polyfill doesn't work with Fluent
        // Regenerator polyfill can be safely used with Babel, however
        { coreJsPolyfill: false, regeneratorPolyfill: true, useHelpers: true },
      ],
    ]
  }
  return {
    presets: presets.slice(),
  }
}
