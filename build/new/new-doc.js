const fs = require('fs')
const kebabCase = require('lodash/kebabCase')
const upperFirst = require('lodash/upperFirst')

const { fileSave, getAbsolutePath, docsPath, docsFilePath } = require('./utils')

const mdContentTemplate = function (
  componentName,
  chineseComponentName,
  kebabCaseComponentName
) {
  return `---
title: ${componentName} ${chineseComponentName}
---
# ${componentName}

## 演示

### 基本使用

<demo-box title="基本使用">

<example-${kebabCaseComponentName}-1 slot="demo" />

<div slot="code">

<<< docs/.vuepress/components/example/${kebabCaseComponentName}/1.vue

</div>
</demo-box>`
}

const mdDemoContentTemplate = function (componentName) {
  return `<template>
  <${kebabCase(componentName)} />
</template>

<script>
export default {
  name: 'Example${upperFirst(componentName)}1',
  data() { return {} },
  methods: {}
}
</script>
`
}

module.exports = function (name, chineseName, opt) {
  // --> 组件文档内容结束
  const { componentType, newComponentType, chineseComponentType } = opt
  const kebabCaseComponentName = kebabCase(name)
  let docsConfigFile = []
  if (fs.existsSync(docsFilePath)) {
    docsConfigFile = require(docsFilePath)
  }
  let mdPath = getAbsolutePath(
    `/docs/${componentType}/${kebabCaseComponentName}.md`
  )
  let mdDemoPath = getAbsolutePath(
    `/docs/.vuepress/components/example/${kebabCaseComponentName}/1.vue`
  )
  // 新增归类类型
  if (componentType === -1) {
    // 重新生成文档路径
    mdPath = getAbsolutePath(
      `/docs/${newComponentType}/${kebabCaseComponentName}.md`
    )
    docsConfigFile.push({
      title: chineseComponentType,
      name: newComponentType,
      collapsable: false,
      children: [`/${newComponentType}/${kebabCaseComponentName}`]
    })
  } else {
    const SHORT_MD_PATH = `/${componentType}/${kebabCaseComponentName}`
    const currentComponentType = docsConfigFile.find(
      (item) => item.name === componentType
    )
    currentComponentType.children.push(SHORT_MD_PATH)
  }
  // 创建文件
  fileSave(mdPath, mdContentTemplate(name, chineseName, kebabCaseComponentName))
  // 创建案例
  fileSave(mdDemoPath, mdDemoContentTemplate(name))
  // 更新引用
  fileSave(docsFilePath, JSON.stringify(docsConfigFile, null, 2))
}
