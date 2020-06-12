let presets = null

module.exports = function getBabelConfig() {
  if (presets === null) {
    presets = [require.resolve('@repay/babel-preset')]
  }
  return {
    presets: presets.slice(),
  }
}
