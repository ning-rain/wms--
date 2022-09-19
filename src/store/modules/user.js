import router from '@/router'
const state = {
  isRemember: localStorage.getItem('isRemember') || false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || { username: '', password: '' },
  token: localStorage.getItem('token') || ''
}

const mutations = {
  setIsRemember(state, payload) {
    state.isRemember = payload
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  removeUserInfo(state) {
    localStorage.removeItem('userInfo')
    state.userInfo = { username: '', password: '' }
  },
  setToken(state, payload) {
    state.token = payload
    localStorage.setItem('token', payload)
  },
  removeToken(state) {
    state.token = ''
    localStorage.removeItem('token')
  }
}

const actions = {
  // 登录的同时 处理一下isRememeber 以及用户信息
  isLogin({ commit }, payload) {
    // 完成登陆
    commit('setIsRemember', payload.isRemember)
    localStorage.setItem('isRemember', payload.isRemember)
    // console.log(payload.isRemember)
    const userMsg = { username: payload.username, password: payload.password }
    commit('setUserInfo', userMsg)
    localStorage.setItem('userInfo', JSON.stringify(userMsg))
    commit('setToken', 123)
    router.push('/dashboard')
  },
  // 退出功能
  loginOut(context) {
    if (context.state.isRemember) {
      router.push('/login')
    } else {
      context.commit('removeUserInfo')
    }
    context.commit('removeToken')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

