const fs = require('fs')
const { fileSave, getAbsolutePath } = require('./utils')
module.exports = function (name) {
  const themePath = getAbsolutePath('src/theme/src')
  // 更新引用
  const themeEntryPath = getAbsolutePath('src/theme/src/index.less')
  const importText = `${fs.readFileSync(
    themeEntryPath
  )}@import "./${name}.less";`
  fileSave(themeEntryPath, importText)
  // 创建文件
  fileSave(`${themePath}/${name}.less`, '')
}
