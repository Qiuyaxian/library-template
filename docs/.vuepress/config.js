const docs = require('../docs.json')
const commonSidebar = ['/', ...docs]

module.exports = {
  title: 'library-template组件库模版',
  description: '基于该模版快速实现组件库开发',
  base: '/',
  themeConfig: {
    // 头部导航栏
    nav: [
      {
        text: 'Github',
        link: 'https://github.com/Qiuyaxian/react-cra-template.git'
      }
    ],
    // 左侧导航
    sidebar: commonSidebar
  }
}
