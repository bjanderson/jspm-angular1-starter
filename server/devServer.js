'use strict'

const browserSync = require('browser-sync')
const directoryToServe = process.env.SERVE_DIRECTORY || 'client'
const express = require('express')
const path = require('path')
const port = process.env.npm_package_config_expressPort
const proxyPort = process.env.npm_package_config_browsersyncPort
const server = express()

function sync () {
  browserSync({
    proxy: 'localhost:' + port,
    files: [
      './client/*.{css,html,js}',
      './client/**/*.{css,html,js}'
    ],
    port: proxyPort
  })
}

server.use(express.static(path.join(__dirname, '/../', directoryToServe)))
server.listen(port, sync)

console.log(`Serving the ${directoryToServe}/ directory at http://localhost:${port} and live-reloadeed at http://localhost:${proxyPort}`)
