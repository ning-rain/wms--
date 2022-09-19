<template>
  <el-col :span="num" style="padding: 0 15px">
    <router-link :to="url">
      <div class="itemContainer2">
        <div class="icon">
          <div class="iconfont" :style="{'background': color}">
            <i :class="['iconfont', icon]" />
          </div>
          <div class="icontitle">
            <p>{{ itemName }}</p>
          </div>
        </div>
      </div>
    </router-link>
  </el-col>

</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default: 5
    },
    url: {
      type: String,
      default: ''
    },
    itemName: {
      type: String,
      default: '123'
    },
    color: {
      type: String,
      default: 'rgb(0, 118, 255)'
    },
    icon: {
      type: String,
      default: 'icon-wj-chwj'
    }
  }
}
</script>

<style lang="scss" >
 .itemContainer2{
    position: relative;
    height: 93px;
    background: #fbf7f7;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    &:hover{
    background: hsla(0,0%,100%,.8);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 6%);
    border-radius: 8px;
    border: 1px solid #f5efee;
    }
    .icon{
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .iconfont{
        width: 50px;
       height: 50px;
      //  background: #0076ff;
       border-radius: 25px;
       display: flex;
       align-items: center;
       justify-content: space-around;
       color: white;
       font-size: 35px;
      }
      .icontitle{
        font-size: 16px;
        margin-left:15px ;
      }
    }
  }
</style>
