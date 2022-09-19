import { asyncRoutes, constantRoutes } from '@/router'
const state = {
  routes: [...constantRoutes, ...asyncRoutes]
}
const mutations = {}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
