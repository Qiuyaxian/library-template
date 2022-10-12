const fs = require('fs')
const path = require('path')
const fromPairs = require('lodash/fromPairs')
const nodeExternals = require('webpack-node-externals')
const pathResolve = (filePath) => path.resolve(__dirname, filePath)

exports.alias = {
  'library-template': pathResolve('../')
}

function getFilePath(prefixPath) {
  const files = fs.readdirSync(prefixPath)
  const entryFile = files.find((file) => /index\.(jsx?|tsx?)$/.test(file))
  if (entryFile) {
    return path.join(prefixPath, entryFile)
  }
}

const packagesPrefixPath = path.join(__dirname, '../packages')

const components = fromPairs(
  fs
    .readdirSync(packagesPrefixPath)
    .filter((pkgName) => {
      // 解决mac系统下自带.DS_Store文件问题
      const fsData = fs.statSync(path.join(packagesPrefixPath, pkgName))
      return fsData ? fsData.isDirectory() : false
    })
    .map((pkgName) => {
      return [pkgName, getFilePath(path.join(packagesPrefixPath, pkgName))]
    })
)

exports.components = components
exports.entry = {
  ...components
}

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

exports.externals = [nodeExternals()]

exports.jsexclude = '/node_modules/'
