const path = require('path')
// const camelCase = require('lodash/camelCase')
// const upperFirst = require('lodash/upperFirst')
// const upperCamelCase = str => upperFirst(camelCase(str))
const {
  kebabCase,
  fileSave,
  getComponentName,
  setComponent
} = require('./utils')

module.exports = function (name) {
  const componentName = getComponentName(name)
  const kebabCaseComponentName = kebabCase(name)
  const packagePath = path.resolve(
    __dirname,
    '../../packages',
    kebabCaseComponentName
  )
  const Files = [
    {
      filename: 'index.js',
      content: `import ${componentName} from './src/main';

/* istanbul ignore next */
${componentName}.install = function(Vue) {
  Vue.component(${componentName}.name, ${componentName});
};

export default ${componentName};`
    },
    {
      filename: 'src/main.vue',
      content: `<template>
  <div class="${componentName}"></div>
</template>

<script>
export default {
  name: '${componentName}'
};
</script>`
    }
  ]

  // 创建 package
  Files.forEach((file) => {
    fileSave(path.join(packagePath, file.filename), file.content)
  })
  // 更新 components.json 配置
  setComponent(kebabCaseComponentName)
}
