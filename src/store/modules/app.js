import Cookies from 'js-cookie'

const state = {
  // sidebar: {
  //   opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
  //   withoutAnimation: false
  // },
  navArr: [{ title: '工作台', path: '/dashboard' }],
  currentPage: {},
  currentIndex: 0,
  device: 'desktop'
}

const mutations = {
  ADD_NAVBARITEM: (state, newitem) => {
    state.navArr.push(newitem)
  },
  EDIT_NAVBARITEM: (state, info) => {
    state.navArr[info.index].title = info.title
  },
  DELET_NAVBARITEM: (state, index) => {
    state.navArr.splice(index, 1)
  },
  ADD_CURRENTPAGE: (state, newitem) => {
    state.currentPage = newitem
  },
  CHANGE_CURRENTINDEX: (state, num) => {
    state.currentIndex = num
  },
  EDIT_NAVBARITEM: (state, info) => {
    state.navArr[info.index].title = info.title
  }

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
