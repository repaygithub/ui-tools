const fs = require('fs')
const path = require('path')
let pkg = null

module.exports = function getModulePkg(cwd) {
  if (pkg === null) {
    pkg = JSON.parse(fs.readFileSync(path.resolve(cwd, 'package.json'), 'utf8'))
  }
  return pkg
}
