const tempy = require('tempy')
const fs = require('fs-extra')
const path = require('path')
const psTree = require('ps-tree')
const { exec: execOld, spawn } = require('child_process')
const util = require('util')
const exec = util.promisify(execOld)

// automatically clean up after tests
let testInstances = []
afterEach(async () => {
  for (const t of testInstances) {
    await t.cleanup()
  }
  testInstances = []
})

class TestSetup {
  constructor(fixture) {
    this.fixture = fixture
    this.tempDir = tempy.directory()
    this._listeners = []
    this._server = null
    testInstances.push(this)
  }

  async setup() {
    await fs.copy(path.join(__dirname, 'fixtures', this.fixture), this.tempDir)
    const localRepayScriptsPath = path.join(__dirname, '..')
    await this.yarnAdd(localRepayScriptsPath)
  }

  yarnAdd(pkgName) {
    return exec(`yarn add ${pkgName} --mutex network`, { cwd: this.tempDir })
  }

  readFile(file) {
    return fs.readFile(this.resolve(file), 'utf8')
  }

  writeFile(file, contents) {
    return fs.writeFile(this.resolve(file), contents, 'utf8')
  }

  readdir(dir) {
    return fs.readdir(this.resolve(dir))
  }

  exec(command) {
    return exec(command, { cwd: this.tempDir })
  }

  resolve(localPath) {
    return path.join(this.tempDir, localPath)
  }

  _dataUpdate() {
    this._listeners.forEach((func) => {
      func(this._data)
    })
  }

  /**
   * can be used to debug a spawn by adding a listener before initiating
   * ex:
   *   test.subscribe(data => console.log(data[data.length - 1]))
   */
  subscribe(func) {
    this._listeners.push(func)
  }

  unsubscribe(func) {
    this._listeners.splice(this._listeners.indexOf(func), 1)
  }

  spawn(command, args) {
    this._childProcess = spawn(command, args, { cwd: this.tempDir })
    this._data = []
    this._data.push = (...args) => {
      Array.prototype.push.apply(this._data, args)
      this._dataUpdate()
    }
    this._childProcess.stdout.on('data', (d) => this._data.push(d.toString()))
    return this._childProcess
  }

  async cleanup() {
    if (this._childProcess && !this._childProcess.killed) {
      await this.kill()
    }
    if (this._server) {
      await this._server.close()
      this._server = undefined
    }
    if (this._browser) {
      await this._browser.close()
      this._browser = undefined
    }
    if (this.tempDir) {
      await fs.remove(this.tempDir)
      this.tempDir = null
    }
  }

  kill() {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (this._childProcess.killed || this._childProcess.exitCode !== null) {
          resolve()
        } else {
          this._childProcess.on('exit', () => {
            if (this._childProcess.stdout) {
              this._childProcess.stdout.destroy()
            }

            if (this._childProcess.stderr) {
              this._childProcess.stderr.destroy()
            }
            resolve()
          })
          this._childProcess.on('error', () => reject())
          psTree(this._childProcess.pid, (err, children) => {
            children.forEach((c) => {
              try {
                process.kill(c.PID, 'SIGKILL')
              } catch (e) {
                console.log('err', e)
              }
            })
            this._childProcess.kill('SIGKILL')
          })
        }
      })
    })
  }

  waitForText(text, count = 1) {
    return new Promise((resolve) => {
      const wasTextSeen = (data) => {
        let found = 0
        for (let i = 0; i < data.length; ++i) {
          const datum = data[i]
          if (typeof datum === 'string' && datum.includes(text)) {
            ++found
            if (found === count) {
              return true
            }
          }
        }
        return false
      }

      process.nextTick(() => {
        if (wasTextSeen(this._data)) {
          resolve()
        } else {
          const resolver = (data) => {
            if (wasTextSeen(data)) {
              this.unsubscribe(resolver)
              resolve()
            }
          }
          this.subscribe(resolver)
        }
      })
    })
  }

  async updateFile(fileLoc) {
    let parsed = path.parse(fileLoc)
    let updateLoc = path.join(parsed.dir, `${parsed.name}.update${parsed.ext}`)
    if (fs.existsSync(this.resolve(updateLoc))) {
      let contents = await this.readFile(updateLoc)
      await this.writeFile(fileLoc, contents)
    } else {
      throw new Error(`Could not find update file for ${fileLoc} at ${updateLoc}`)
    }
  }

  startServer(port = 8100) {
    const startStaticServer = require('./static-server')
    this._server = startStaticServer({ directory: path.join(this.tempDir, 'dist'), port })
  }

  async getBrowser() {
    const puppeteer = require('puppeteer')
    return (this._browser = await puppeteer.launch({ ignoreHTTPSErrors: true }))
  }

  async getPage() {
    if (!this._browser) {
      await this.getBrowser()
    }
    return this._browser.newPage()
  }
}

module.exports = TestSetup
