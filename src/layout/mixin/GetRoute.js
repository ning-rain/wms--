import store from '@/store'
export default {
 beforeRouteEnter (to, from, next) {
  // ...
  const navArr = store.getters.navArr
  const flag = navArr.some((item) => item.path == to.path);
  if (!flag) {
        // this.navArr.push(this.$route.meta.title);
        store.commit("app/ADD_NAVBARITEM", {
          title: to.meta.title,
          path: to.path,
        });
  }
  // console.log(flag);
  // console.log(navArr);
  // console.log(to);
  next()
 } 
}
