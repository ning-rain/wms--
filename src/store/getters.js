const getters = {
  sidebar: state => state.app.sidebar,
  navArr:state => state.app.navArr,
  currentPage:state => state.app.currentPage,
  currentIndex:state=>state.app.currentIndex,
  device: state => state.app.device,
  isRememberNot: state => state.user.isRemember,
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  currentWareHouseDetails:state => state.manageBaseInfo.currentWareHouseDetails
}
export default getters
