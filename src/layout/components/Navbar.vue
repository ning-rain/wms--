<template>
  <div class="navbar">
    <ul>
      <!-- class="navItem" -->
      <li
        v-for="(item, index) in navArr"
        :key="item.path"
        :class="currentIndex == index ? 'active navItem' : 'navItem'"
        @click="goOtherPage(item.path, index)"
      >
        {{ item.title }}
        <i
          v-if="index !== 0"
          class="el-icon-close"
          @click.stop="del(index)"
        />
      </li>
    </ul>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" /> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> Home </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/PanJiaChen/vue-admin-template/"
          >
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a
            target="_blank"
            href="https://panjiachen.github.io/vue-element-admin-site/#/"
          >
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'navArr', 'currentIndex'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    del(index) {
      // index 8
      // length 7
      this.$store.commit('app/DELET_NAVBARITEM', index)
      let path = ''
      if (index === this.navArr.length) {
        this.$store.commit('app/CHANGE_CURRENTINDEX', index - 1)
        path = this.navArr[this.currentIndex].path
      } else if (index === this.currentIndex) {
        this.$store.commit('app/CHANGE_CURRENTINDEX', this.navArr.length - 1)
        path = this.navArr[this.currentIndex].path
      } else if (this.currentIndex > index) {
        this.$store.commit('app/CHANGE_CURRENTINDEX', this.currentIndex - 1)
        path = this.navArr[this.currentIndex].path
      }
      this.$router.push(path)
    },

    goOtherPage(path, index) {
      console.log(index)
      this.$store.commit('app/CHANGE_CURRENTINDEX', index)
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss">
.navbar {
  height: 64px;
  overflow: hidden;
  position: relative;
  background: #f5f1f1;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  ul {
    margin: 0;
    display: flex;

    .navItem {
      height: 36px;
      line-height: 36px;
      margin: 14px 15px 14px 0;
      padding: 0 15px;
      list-style: none;
      background-color: #fff;
      cursor: pointer;
      border-radius: 6px;
      font-size: 13px;
      color: #b5abab;
      font-weight: 400;
      font-family: PingFangSC, PingFangSC-Regular;
      &.active {
        color: #ffb200;
      }
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: rgb(136, 126, 126);
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
