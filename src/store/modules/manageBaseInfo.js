const state = {
  currentWareHouseDetails:{}
}

const mutations = {
SET_DETAILS:(state,item)=>{
  state.currentWareHouseDetails =item
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
