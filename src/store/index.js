import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permissions from './modules/permissions'
import manageBaseInfo from "./modules/manageBaseInfo";
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permissions,
    manageBaseInfo
  },
  getters
})

export default store
