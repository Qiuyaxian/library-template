# 指南

## 安装

```bash
yarn add library-template --registry=xxx

# OR

npm install --save-dev library-template --registry=xxx
```

## 快速上手

> 本节将介绍如何在项目中使用 library-template

### 完整引入

```js
import Vue from 'vue'
import LibraryTemplate from 'library-template'
import 'library-template/theme/index.css'

Vue.use(LibraryTemplate)
```

### 按需引入

可以通过以下的写法来按需加载组件。

```js
import { Demo } from 'library-template/lib/demo'
```

或者可以通过安装 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 来进行按需加载：

```bash
yarn add -D babel-plugin-import
```

```js
// 导入写法
import { Demo } from 'library-template'
```

在 `babel.config.js` 文件内增加配置：

```js
plugins: [
  [
    'import',
    {
      libraryName: 'library-template',
      styleLibraryName: 'theme'
    }
  ]
]
```

完整组件列表：

```js
import { Demo, xxx1, xxx2 } from 'library-template'

Vue.use(Demo)
Vue.use(xxx2)
Vue.use(xxx2)
```
