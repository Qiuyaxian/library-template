// step4（单个构建组件，并生成文件，并支持按需引用）
const path = require('path')
const webpackBaseConfig = require('./webpack.base')
const { entry } = require('./common-config')

const webpackConfig = {
  ...webpackBaseConfig,
  entry: {
    ...entry
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  }
}

module.exports = webpackConfig
