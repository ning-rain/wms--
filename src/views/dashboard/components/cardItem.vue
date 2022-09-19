<template>
  <el-col :span="num" style="padding: 0 15px">
    <router-link :to="url">
      <div class="itemContainer">
        <div class="icon">
          <div class="iconfont" :style="{'background': color}">
            <i :class="['iconfont', icon]" />
          </div>
          <div class="icontitle">
            <p>{{ itemName }}</p>
          </div>
        </div>
        <div class="cardBottom">
          <div>
            新增 <span class="addNum">{{ addNum }}</span>
            待审核 <span :style="{'color': color}">{{ waitNum }}</span>
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
      default: 8
    },
    url: {
      type: String,
      default: ''
    },
    itemName: {
      type: String,
      default: '123'
    },
    addNum: {
      type: Number,
      default: 8
    },
    waitNum: {
      type: Number,
      default: 8
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

<style lang="scss">
 .itemContainer{
    position: relative;
    height: 186px;
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
      // justify-content: center;
      .iconfont{
        width: 49px;
        height: 49px;
        // background: #0076ff;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: white;
        font-size: 30px;
      }
      .icontitle{
        font-size: 16px;
        margin-left:15px ;
      }
    }
    .cardBottom{
      position: absolute;
      width: 100%;
      bottom: 20px;
      display: flex;
      div{
        flex: 1;
        font-size: 14px;
        color: #887e7e;
        margin-right: 10px;
        display: flex;
        align-items: center;
        // justify-content: center;
        span{
          font-size: 36px;
          font-family: DIN-Medium,DIN;
          font-weight: 500;
          color: #332929;
          margin: 0 20px 0 10px;
        }
      }
    }
  }
</style>
