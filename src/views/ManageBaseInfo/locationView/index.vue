<template>
  <div v-loading="loading" class="classContainer">
    <div class="left">
      <p class="subject">库区选择</p>
      <el-select v-model="value" placeholder="请选择厂库">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <div class="areaContainer">
        <el-input v-model="likeName" placeholder="请输入区域名称" suffix-icon="el-icon-search" />
        <div v-if="areaList.length !== 0" class="containerBox">
          <div
            v-for="item in areaList"
            :key="item.id"
            class="areaItem"
            :class="{active:areaListId===item.id}"
            @click="changeCode(item)"
          >{{ item.name }}</div>
        </div>
        <div v-else class="container">
          <div class="smallBox">
            <p>暂无库区</p>
            <el-button type="success" round @click="$router.push(`/manage-base-info/area/details/${code2}`)">新增库区</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="middle" />
    <div class="right">
      <div
        class="top"
        style="display:flex"
      >
        <div style="margin-right:90px"><p class="subject">库区总览</p></div>
        <div class="overView" style="display:flex">
          <div class="item">
            <span>库存总计:</span>
            <span>{{ containObj.total }}</span>
          </div>
          <div class="item">
            <div class="smallbox" style="background-color: rgb(195, 195, 195)" />
            <span>停用车位:</span>
            <span>{{ containObj.stop }}</span>
          </div>
          <div class="item">
            <div class="smallbox" style="background-color: rgb(0, 190, 118)" />
            <span>占用车位:</span>
            <span>{{ containObj.use }}</span>
          </div>
          <div class="item">
            <div class="smallbox" style="background-color: rgb(178, 220, 204)" />
            <span>空闲车位:</span>
            <span>{{ containObj.free }}</span>
          </div>
        </div>
      </div>
      <div v-if="divContainerList.length!== 0" class="divContainer">
        <el-tooltip v-for="item in divContainerList" :key="item.id" class="item" effect="light" content="Bottom Center 提示文字" placement="bottom">
          <div slot="content">库位编号：{{ item.code }}
            <br>库位名称：{{ item.name }}
            <br>库位位置：{{ item.locationRow }}排{{ item.locationColumn }}列{{ item.locationLayer }}层
            <br>库位状态：{{ item.conditionMsg }}
            <br>货品名称：{{ item.goodsName }}
            <br>货品数量：{{ item.goodsTotal }}
          </div>
          <div :style="{backgroundColor:item.color}" />
        </el-tooltip>
      </div>
      <div v-else>
        <div class="smallBox">
          <img src="@/assets/empty.4300e933.png" alt="">
          <p>暂无库区</p>
          <!-- manage-base-info/location/details/null -->
          <el-button type="success" round @click="$router.push(`/manage-base-info/area/details/null`)">新增库区</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllWareHouse, getAreaListDate, getInptSearchAreaList, getAreaBySearch, getDetailLocation } from '@/api/manageBaseInfo'
export default {
  filters: {
    colorFormat: (item) => {
      console.log(item)
    }
  },
  data() {
    return {
      options: [],
      // warehouseId
      value: '',
      likeName: '',
      areaList: [],
      areaListId: '',
      containObj: {
        free: 0,
        stop: 0,
        total: 0,
        use: 0
      },
      divContainerList: [],
      loading: false,
      code: '',
      code2: ''
    }
  },
  watch: {
    value(val) {
      const arr = this.options.filter((item) => (item.id === val ? item.code : ''))
      console.log(arr)
      this.code2 = arr[0].code
      console.log(this.code2)
      this.getAreaListDate()
    },
    areaListId(val) {
      this.changeId(val)
      console.log(val)
      // areaId
      if (val !== '') {
        this.getDetailLocation(val)
      }
    },
    likeName(value) {
      if (value !== '') {
        this.searchDetail()
      } else {
        this.searchDetail()
      }
    }
  },
  mounted() {
    try {
      this.loading = true
      this.getDate()
    } catch {
      this.$message.error('数据加载失败')
    } finally {
      this.loading = false
    }
  },
  methods: {
    async getDate() {
      const res = await getAllWareHouse()
      this.options = res.data
      this.code2 = res.data[0].code
      // console.log(this.options)
      this.value = res.data[0].id
    },
    async getAreaListDate() {
      const res = await getAreaListDate({
        warehouseId: this.value,
        status: 1
      })
      console.log(res)
      this.areaList = res.data
      if (this.areaList.length !== 0) {
        this.areaListId = this.areaList[0].id
        this.code = this.areaList[0].code
      } else {
        this.containObj = {
          free: 0,
          stop: 0,
          total: 0,
          use: 0
        }
        this.divContainerList = []
      }
    },
    async searchDetail() {
      const res = await getInptSearchAreaList({
        status: 1,
        like_name: this.likeName,
        warehouseId: this.value
      })
      if (res.data.length !== 0) {
        this.areaList = res.data
        this.areaListId = res.data[0].id
        this.code = res.data[0].code
      } else {
        this.areaList = []
        this.divContainerList = []
        this.areaListId = ''
        this.containObj = {
          free: 0,
          stop: 0,
          total: 0,
          use: 0
        }
      }
    },
    async changeId(id) {
      if (id !== '') {
        const { data } = await getAreaBySearch(id)
        this.containObj = data
        console.log(data)
      }
    },
    async getDetailLocation(id) {
      const res = await getDetailLocation({ areaId: id })
      console.log(res)
      res.data.forEach(item => {
        if (item.status === 0) {
          item.color = 'rgb(195, 195, 195)'
          item.conditionMsg = '停用'
        } else {
          item.color = item.useStatus === 0 ? 'rgb(178, 220, 204)' : 'rgb(0, 190, 118)'
          item.conditionMsg = item.useStatus === 0 ? '空闲' : '占用'
        }
      })
      this.divContainerList = res.data
    },
    changeCode(item) {
      this.areaListId = item.id
      this.code = item.code
      console.log(this.code)
    }

  }
}
</script>

<style lang="scss" scoped>
  .classContainer{
    background: rgb(255, 255, 255);
    border-radius: 12px;
    box-shadow: rgb(144 142 142 / 17%) 0px 0px 6px 0px;
    margin: 10px 15px 30px;
    min-height:680px;
    .left{
    width: 263px;
    padding: 27px 19px 27px 20px;
    float: left;
    ::v-deep .el-select{
      display: block;
    }
    ::v-deep .el-select .el-input.is-focus .el-input__inner{
      border-color: #ffb200;
    }
    ::v-deep .el-input__inner{
      background-color: #f8f5f5;
    }
    .areaContainer{
     width: 224px;
     background: #fdfcf9;
     border: 1px solid #f7f2f1;
     border-radius: 6px;
     padding: 30px 29px 30px 26px;
     margin-top: 21px;
     min-height: 480px;
     .containerBox{
      height: 380px;
      overflow:auto;
     }
    .areaItem{
    width: 140px;
    height: 40px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 6px 0 rgb(255 178 0 / 40%);
    margin: 0 auto;
    margin-top: 20px;
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    color: #ffb200;
    line-height: 40px;
    cursor: pointer;
    &.active{
    background: #ffb200;
    color: #332929;
    }
    }
    }
    .container{
      min-height: 380px;
      display: flex;
      align-items: center;
      justify-content: center;
      .smallBox{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
        width: 160px;
        height: 160px;
      }
      }
    }
    }
    .middle{
    float: left;
    width: 10px;
    min-height:680px;
    background: linear-gradient(270deg, rgba(255, 255, 255, 0), rgba(99, 97, 96, 0.1));
    }
    .right{
    padding: 27px 19px 27px 20px;
    float: left;
    height: 100%;
    width: calc(100% - 273px);
    .smallBox{
      height:400px;
      display: flex;
      // color: rgb(178, 220, 204);
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
        width: 160px;
        height: 160px;
      }
      }
    .overView{
      .item{
        margin-right: 5px;
        height: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        .smallbox{
        width: 12px;
        height: 12px;
        border-radius: 3px;
        }
        span{
          margin-right: 4px;
           width: 60px;
           font-size: 14px;
           font-weight: 400;
           color: #424250;
           margin-left: 10px;
        }
      }
    }
    .divContainer{
      display: flex;
      div{
        width: 36px;
        height: 36px;
        border-radius: 7px;
        // background-color: #424250;
        margin-right: 12px;
        margin-bottom: 10px;
      }
    }
    }
  }
  .subject{
    font-size: 16px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #332929;
    line-height: 22px;
    margin: 0;
    margin-bottom: 19px;
    }
</style>
