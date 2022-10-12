// step2（以 umd 规范打包构建类库入口）
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const webpackBaseConfig = require('./webpack.base')
// 生产
const webpackConfig = {
  ...webpackBaseConfig,
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: 'library-template.common.js',
    chunkFilename: '[id].js',
    libraryExport: 'default',
    library: 'ELEMENT',
    libraryTarget: 'commonjs2'
  },
  optimization: {
    minimize: false
  }
}

module.exports = webpackConfig
