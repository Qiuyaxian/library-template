import DemoBlock from './components/demo-block'
import '../../src/theme/src/index.less'
export default ({ Vue, isServer }) => {
  if (!isServer) {
    window.global = window
    return import('../../src/index')
      .then((module) => {
        Vue.use(DemoBlock, {
          jsRes: ['//unpkg.com/vue/dist/vue.js']
        })
        Object.entries(module).forEach(([name, component]) => {
          Vue.use(component)
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }
}
