const fs = require('fs')
const path = require('path')
const nodeFileSave = require('file-save')
const camelCase = require('lodash/camelCase')
const upperFirst = require('lodash/upperFirst')
const upperCamelCase = (str) => upperFirst(camelCase(str))
const getAbsolutePath = (dir) => path.join(__dirname, '../../', dir)
const packagesPath = getAbsolutePath('packages')
const componentPath = getAbsolutePath('components.json')
const docsPath = getAbsolutePath('docs')
const docsFilePath = getAbsolutePath('docs/docs.json')

let componentsFile = {}

function fileSave(path, content, format) {
  // mkdirp.sync(path)
  // fs.writeFileSync(path, format ? format(content) : content)
  nodeFileSave(path)
    .write(format ? format(content) : content, 'utf8')
    .end('\n')
}

if (!fs.existsSync(componentPath)) {
  componentsFile = initConfigFiles()
} else {
  componentsFile = require(componentPath)
}

// 防止配置文件不存在或者删除
function initConfigFiles() {
  const componentsFile = {}
  const packages = fs.readdirSync(packagesPath)
  if (Array.isArray(packages)) {
    for (var i = 0; i < packages.length; i++) {
      const packageName = packages[i]
      if (fs.statSync(`${packagesPath}/${packageName}`).isDirectory()) {
        componentsFile[packageName] = `./packages/${packageName}/index.js`
      }
    }
  }
  return componentsFile
}

module.exports = {
  docsPath: docsPath,
  docsFilePath: docsFilePath,
  packagesPath: packagesPath,
  componentPath: componentPath,
  components: componentsFile,
  getAbsolutePath: getAbsolutePath,
  getComponentName(componentName) {
    return upperCamelCase(componentName)
  },
  getComponent(componentName) {
    return componentsFile[componentName]
  },
  setComponent(componentName) {
    if (!componentsFile) {
      throw new Error('components.json is not empty')
    } else {
      componentsFile[componentName] = `./packages/${componentName}/index.js`
      fileSave(componentPath, JSON.stringify(componentsFile, null, 2))
    }
  },
  isExistComponent(componentName) {
    return componentMap(componentName)
  },
  fileSave: fileSave
}
