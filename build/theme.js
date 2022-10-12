// step5
const fs = require('fs')
const path = require('path')
const { components } = require('./common-config')
const themes = ['theme']
const componentNames = Object.keys(components)

const basepath = path.resolve(__dirname, '../src/')

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile()
  } catch (err) {
    return false
  }
}

const useCssType = 'less'

themes.forEach((theme) => {
  const isLess = theme !== 'theme-default'
  let indexContent = isLess
    ? `@import "./base.${useCssType}";\n`
    : '@import "./base.css";\n'
  // 在index中写入引用文件
  componentNames.forEach(function (key) {
    if (['icon', 'option', 'option-group'].indexOf(key) > -1) return
    const fileName = key + (isLess ? `.${useCssType}` : '.css')
    indexContent += `@import "./${fileName}";\n`
    // 写入文件内容
    const filePath = path.resolve(basepath, theme, 'src', fileName)
    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8')
      console.log(theme, ' 创建遗漏的 ', fileName, ' 文件')
    }
  })
  fs.writeFileSync(
    path.resolve(
      basepath,
      theme,
      'src',
      isLess ? `index.${useCssType}` : 'index.css'
    ),
    indexContent
  )
})
