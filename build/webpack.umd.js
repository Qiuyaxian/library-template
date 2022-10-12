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
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'LIBRARY',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
}

module.exports = webpackConfig
