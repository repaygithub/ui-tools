let __DEBUG__ = false
const log = (...args) => console.log(...args)
const debug = (...args) => void (__DEBUG__ && log('[DEBUG]', ...args))

module.exports = {
  log,
  debug,
  setDebug: (debug) => (__DEBUG__ = Boolean(debug)),
}
