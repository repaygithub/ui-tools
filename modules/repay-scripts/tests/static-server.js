const http = require('http')
const { promises: fs } = require('fs')
const path = require('path')

module.exports = startStaticServer

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.svg': 'application/image/svg+xml',
}

function startStaticServer({ directory, port }) {
  if (!path.isAbsolute(directory)) {
    throw Error(`Provided directory [${directory}] must be an absolute path.`)
  }

  function isForbidden(filePath) {
    return !filePath.startsWith(directory)
  }
  const notFoundPath = path.resolve(directory, './404.html')

  const server = http
    .createServer(function (request, response) {
      let url = request.url
      let filePath = path.join(directory, url)
      if (isForbidden(filePath)) {
        response.writeHead(403)
        response.end('Access Forbidden')
      }
      if (filePath.endsWith('/')) {
        filePath = filePath + 'index.html'
      }

      let extname = String(path.extname(filePath)).toLowerCase()
      let contentType = mimeTypes[extname] || 'application/octet-stream'

      fs.readFile(filePath)
        .then((content) => {
          response.writeHead(200, { 'Content-Type': contentType })
          response.end(content, 'utf-8')
        })
        .catch((error) => {
          if (error.code === 'ENOENT') {
            fs.readFile(notFoundPath)
              .catch(() => 'Not Found')
              .then((content) => {
                response.writeHead(404, { 'Content-Type': mimeTypes['.html'] })
                response.end(content, 'utf-8')
              })
          } else {
            response.writeHead(500)
            response.end('Server Error: ' + error.code + ' ..')
          }
        })
    })
    .listen(port)

  return {
    server,
    close() {
      return new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      })
    },
  }
}
