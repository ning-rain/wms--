<template>
  <div class="login-container">
    <div class="divContainer">
      <div class="divLeft">
        <div class="divTitle">
          <img src="@/assets/loginTitle.png" alt="">
        </div>
        <div class="form" style="margin-top:50px">
          <el-form ref="form" :model="loginForm" :rules="rules">
            <el-form-item size="medium" prop="username">
              <div class="iconLogin">
                <img src="@/assets/loginphone.png" alt="">
              </div>
              <el-input v-model="loginForm.username" placeholder="请输入账号名称" />
            </el-form-item>
            <el-form-item size="medium" prop="password">
              <div class="iconLogin">
                <img src="@/assets/loginlock.png" alt="">
              </div>
              <el-input v-model="loginForm.password" type="password" :show-password="true" placeholder="请输入密码" />
            </el-form-item>
            <div class="rememberPassword">
              <input v-model="isRemember" type="checkbox" class="isRemember" :class="isRemember ? 'yellow': ''" @change="changeRemember">
              <span class="tip" :class="isRemember ? 'isYellow': ''">
                记住密码
              </span>
            </div>
            <el-form-item>
              <div class="loginBtn">
                <el-button @click="submit">立即登入</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="divRight" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      isRemember: '',
      rules: {
        username: [{ required: true, message: '请输入', trigger: 'blur' }],
        password: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['isRememberNot', 'userInfo'])
  },
  watch: {
    isRememberNot: {
      immediate: true,
      handler(val) {
        this.isRemember = val
      }
    },
    userInfo: {
      immediate: true,
      handler(val) {
        this.loginForm.username = val.username
        this.loginForm.password = val.password
      }
    }
  },
  methods: {
    async submit() {
      try {
        await this.$refs.form.validate()
        this.$store.dispatch('user/isLogin', { ...this.loginForm, isRemember: this.isRemember })
      } catch (error) {
        console.log(error)
      }
    },
    async changeRemember() {
      try {
        await this.$refs.form.validate()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#fdfafa;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .divContainer{
    width: 958px;
    height: 516px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 20px rgb(93 93 93 / 33%);
    background-color: #fff;
    border-radius: 40px;
    .divLeft{
    float: left;
    width: 398px;
    height: 516px;
    background: #fff;
    border-radius: 34px 0 0 34px;
    margin: 0 auto;
    ::v-deep .el-form-item__content{
      background-color: #f8f5f5;
    }
    input[type=checkbox]::after{
            position: absolute;
            top: 0;
            border: none;
            /* background-color: #ff670c; */
            color: #fff;
            width: 15px;
            height: 15px;
            display: inline-block;
            visibility: visible;
            padding-left: 0px;
            margin-top: 370px;
            text-align: center;
            content: ' ';
            border-radius: 1px
        }
        input[type=checkbox]:checked::after{
            background-color: #ffB200;
            border-color: #ffB200;
            content: "✓";
            font-size: 12px;
            font-weight: bold;
        }
    .iconLogin{
      display: flex;
      align-items: flex-end;
      background: #eae7e7;
      img{
      width: 25px;
      height: 24px;
      margin: 12px 13px;
      }
    }
    ::v-deep .el-form-item__content{
      margin: 0 60px 20px;
      display: flex;
      align-items: flex-end;
      border-radius: 7px;
    }
    ::v-deep .el-input__inner{
      height: 48px;
      background-color: #f8f5f5;
      border: 1px solid #f8f5f5;
      color: black;
    }
    ::v-deep .el-form-item__error{
      left:60px
    }
    .divTitle{
    margin-left: 124px;
    margin-top: 72px;
    img{
      width: 150px;
    height: 64px;
     }
    }
    .rememberPassword{
      margin: 0 60px 20px;
      display: flex;
      align-items: center;
      .isYellow{
        color: #ffB200;
        font-weight: 600;
      }
      .isRemember{
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        &.yellow{
          background-color: #ffB200;
        }
      }
      .tip{
      padding-left: 10px;
      font-size: 14px;
      }
    }
    .loginBtn{
      width: 100%;
      .el-button{
        width: 100%;
        height: 50px;
        background: #ffb200;
        border-radius: 8px;
        box-shadow: 0 2px 9px 1px rgb(255 178 0 / 47%);
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        color: #332929;
        line-height: 22px;
      }
    }
    }
    .divRight{
      float: right;
    background-image: url(../../assets/loginBgc.png);
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 560px;
    height: 516px;
}
    }
  }
</style>
