import store from './store'
import router from './router'
// 路由判断
const whitePath = ['/login', '/404']
router.beforeEach((to, from, next) => {
  // console.log(whitePath.includes(to.path))
  if (whitePath.includes(to.path)) {
    next()
  } else {
    // console.log(!store.getters.token)
    if (!store.getters.token) {
      next('/login')
    } else {
      next()
    }
  }
})
