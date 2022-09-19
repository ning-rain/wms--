<template>
  <div>
    <logo :collapse="true" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        @select="openMenuItem"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  methods: {
    openMenuItem(index) {
      // console.log(this.$route);
      // console.log(this.navArr);
      // const flag = this.navArr.some((item) => item.path == index);
      // console.log(flag);
      // console.log(this.currentPage.title);
      // if (!flag) {
      //   // this.navArr.push(this.$route.meta.title);
      //   this.$store.commit("app/ADD_NAVBARITEM", {
      //     title: this.$route.meta.title,
      //     path: index,
      //   });
      // }
      // console.log(this.navArr);
      // console.log(this.$route);
      // console.log(index);
      // console.log(indexPath);
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'navArr', 'currentPage']),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },

    variables() {
      return variables
    }
  }
}
</script>

<style lang="scss">
</style>
