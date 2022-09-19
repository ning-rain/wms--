import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/assets/fonts/iconfont.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// import * as filters from '@/filters' // 引入工具类
// // 注册全局的过滤器
// Object.keys(filters).forEach(key => {
//   // 注册过滤器
//   Vue.filter(key, filters[key])
// })
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false
// import GetRoute from './layout/mixin/GetRoute'
// Vue.mixin(GetRoute)
router.beforeEach((to, from, next) => {
  const navArr = store.getters.navArr
  const flag = navArr.some((item) => item.path == to.path)
  if (!flag && to.path !== '/login' && to.path !== '/404') {
    // this.navArr.push(this.$route.meta.title);
    store.commit('app/ADD_NAVBARITEM', {
      title: to.meta.title,
      path: to.path
    })
    store.commit('app/CHANGE_CURRENTINDEX', navArr.length - 1)
  } else {
    const index = navArr.findIndex(item => item.path == to.path)
    store.commit('app/CHANGE_CURRENTINDEX', index)
    console.log(index)
  }
  next()
})
import component from '@/components'
Vue.use(component)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
