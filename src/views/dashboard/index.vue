<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div class="right">
        <div class="banner">
          <img src="@/assets/layout/dashboard-banner-left@2x.5afd2949.png" alt="" class="leftImg">
          <img src="@/assets/layout/dashboard-banner-right@2x.28195570.png" alt="" class="rightImg">
          <img src="@/assets/layout/userImg.png" alt="" class="userImg">
          <p class="userTitle">仓储管理员</p>
          <p class="subject-title">我不是为了输赢，我就是认真！</p>
          <p class="subject-author">—— 罗永浩</p>
          <div class="site">
            <p>北京总仓</p>
          </div>
        </div>
        <div class="container">
          <p class="subject">待办信息</p>
          <div class="item-list" style="margin: 0 15px">
            <el-row>
              <cardItem
                :num="8"
                :url="`/manage-storage-in/list-in/list`"
                :item-name="todoList[0]&&todoList[0].name"
                :add-num="todoList[0]&&todoList[0].value1"
                :wait-num="todoList[0]&&todoList[0].value2"
              />
              <cardItem
                :num="8"
                :url="`/manage-storage-out/list-out`"
                :icon="'icon-wj-fswj'"
                :item-name="todoList[1]&&todoList[1].name"
                :add-num="todoList[1]&&todoList[1].value1"
                :wait-num="todoList[1]&&todoList[1].value2"
                :color="'rgb(255, 178, 0)'"
              />
              <cardItem
                :num="8"
                :url="`/manage-storage/list`"
                :icon="'icon-chaxun'"
                :item-name="todoList[2]&&todoList[2].name"
                :add-num="todoList[2]&&todoList[2].value1"
                :wait-num="todoList[2]&&todoList[2].value2"
                :color="'rgb(255, 113, 0)'"
              />
            </el-row>
          </div>
        </div>
      </div>
      <div class="left">
        <p class="subject">通知/公告</p>
        <div class="item">
          <div class="hr" />
          <span class="title">紧急盘点通知</span>
          <span class="detailTime">2020.12.30 18:34:14</span>
        </div>
        <div class="item">
          <div class="hr" />
          <span class="title">运维服务更新通知</span>
          <span class="detailTime">2021.01.30 18:34:14</span>
        </div>
        <div class="item">
          <div class="hr" />
          <p class="title">客户入库变更通知</p>
          <span class="detailTime">2020.12.30 18:34:14</span>
        </div>
        <div class="item">
          <div class="hr" />
          <p class="title">五一放假通知</p>
          <span class="detailTime">2020.12.30 18:34:14</span>
        </div>
        <div class="item">
          <div class="hr" />
          <p class="title">品达物流系统对接通知</p>
          <span class="detailTime">2020.12.30 18:34:14</span>
        </div>
      </div>
    </div>
    <div class="task">
      <p class="subject">任务导航</p>
      <el-row style="display:flex">
        <cardItem2
          :icon="'icon-huoche'"
          :item-name="'收货任务'"
          :url="'/manage-storage-in/list-in/task-receive'"
        />
        <cardItem2
          :icon="'icon-zhongguohangtiantubiaoheji-weizhuanlunkuo-'"
          :item-name="'上架功能'"
          :color="'rgb(82, 212, 243)'"
          :url="'/manage-storage-in/list-in/task-add'"
        />
        <cardItem2
          :icon="'icon-36'"
          :item-name="'盘点任务'"
          :color="'rgb(255, 113, 0)'"
          :url="'/manage-storage/list-task'"
        />
        <cardItem2
          :icon="'icon-24gf-cartFull4'"
          :item-name="'拣货任务'"
          :color="'rgb(255, 96, 158)'"
          :url="'/manage-storage-out/task-picking'"
        />
        <cardItem2
          :icon="'icon-haoyou'"
          :item-name="'交接任务'"
          :color="'rgb(255, 178, 0)'"
          :url="'/manage-storage-out/manage-task-transfer'"
        />
      </el-row>
    </div>
    <div class="inout-charts">
      <el-row>
        <el-col :span="6">
          <p class="subject">入库/出库信息</p>
        </el-col>
        <el-col :span="18" class="time" align="end">
          <div class="timeContainer">
            <el-button :class="dimension=== 'w'?'active':''" @click="dimension= 'w'">本周</el-button>
            <el-button :class="dimension=== 'e'?'active':''" @click="dimension= 'e'">本月</el-button>
            <el-button :class="dimension=== 'c'?'active':''" @click="dimension='c'">全年</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row style="height:430px">
        <chartsContainer :id="'bar'" :option="barOption" />
      </el-row>
    </div>
    <div class="libs">
      <div class="left">
        <p class="subject">库存使用情况</p>
        <chartsContainer :id="'pie'" :option="pieOption" />
      </div>
      <div class="right">
        <p class="subject">库区使用情况</p>
        <chartsContainer :id="'round'" :option="roundOption" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cardItem from './components/cardItem.vue'
import cardItem2 from './components/cardItem2.vue'
import { getHomeToDo, getHomeSumList, getHomeStockUseStatus, getAreaUseStatus } from '@/api/home'
import chartsContainer from './components/chartsContainer.vue'
export default {
  name: 'Dashboard',
  components: {
    cardItem,
    cardItem2,
    chartsContainer
  },
  data() {
    return {
      todoList: [],
      dimension: 'w',
      barOption: {},
      pieOption: {},
      roundOption: {}
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    async dimension(val) {
      this.getHomeSumList(val)
    }
  },
  mounted() {
    this.getDate()
  },
  methods: {
    async getDate() {
      const res = await getHomeToDo()
      this.todoList = res.data
      this.getHomeSumList(this.dimension)
      const { data } = await getHomeStockUseStatus()
      console.log(data)
      this.pieOption = {
        color: ['#e2dbda', '#f3ac3d'],
        tooltip: {
          trigger: 'item',
          formatter: `{d}%`
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
                color: () => {
                  return color[index]
                }
              }
            },
            labelLine: {
              show: false
            },
            data: data
          }
        ]
      }
      const result = await getAreaUseStatus()
      console.log(result)
      this.roundOption = {
        color: ['#2d78f6', '#76d2ef', '#6a7b9d', '#f4b43f', '#ee7930'],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          right: 'right',
          top: '30%'

        },
        series: [
          {
            type: 'pie',
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 348, name: '拣货区' },
              { value: 487, name: '出库区' },
              { value: 677, name: '暂存库区' },
              { value: 126, name: '进货暂存区' },
              { value: 298, name: '出货暂存区' }
            ]
          }
        ]
      }
    },
    async getHomeSumList(value) {
      const { data } = await getHomeSumList({ dimension: value })
      console.log(data)
      this.barOption = {
        color: ['#ef8232', '#f4b43f'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          bottom: '20px'
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: data.x
        },
        yAxis: {
          type: 'value',
          max: 1000,
          axisLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            data: data.data[0].data,
            type: 'bar',
            name: data.data[0].name,
            barGap: 0
          },
          {
            data: data.data[1].data,
            type: 'bar',
            name: data.data[1].name,
            barGap: 0
          }
        ]
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-text {
    font-size: 30px;
    line-height: 46px;
    display: flex;
    .right{
    width: calc(100% - 261px);
    padding-right: 30px;
    .banner{
    position: relative;
    width: 100%;
    height: 148px;
    background: linear-gradient(270deg,#ffc771,#ffa634);
    box-shadow: 0 0 6px 0 rgb(188 151 69 / 12%);
    border-radius: 12px;
    .leftImg{
    position: absolute;
    top: 0px;
    left: 0px;
    height: 148px;
    }
    .rightImg{
    position: absolute;
    top: 0px;
    right: 0px;
    height: 148px;
    }
    .userImg{
    position: absolute;
    top: 31px;
    left: 43px;
    height: 62px;
    }
    .userTitle{
    position: absolute;
    left: 36px;
    bottom: 6px;
    font-size: 16px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: #332929;
    line-height: 22px;
    }
    .subject-title{
    position: absolute;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: #fff;
    line-height: 25px;
    top: 25px;
    left: 200px;
    font-size: 18px;
    }
    .subject-author{
    top: 65px;
    left: 400px;
    font-size: 16px;
    position: absolute;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: #fff;
    line-height: 25px;
    }
    .site{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 147px;
    height: 40px;
    background: #f8f5f5;
    border-radius: 6px;
    opacity: .79;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    font-size: 14px;
    font-weight: 500;
    color: #332929;
    }
  }
  .container{
    margin-top: 20px;
    width: 100%;
    height: 282px;
    background: #fff;
    box-shadow: 0 0 6px rgba(144,142,142,.17);
    border-radius: 12px;
    padding: 25px;

  }
    }
.left{
    width: 261px;
    height: 451px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    padding: 30px;
    .item{
      margin-top: 20px;
      height: 58px;
      .hr{
        background-color: #eee;
        height: 1px;
      }
      .title{
        width: 195px;
        height: 18px;
        font-size: 13px;
        font-weight: 400;
        color: #332929;
        line-height: 18px;
        margin: 0;
        margin-top: 15px;
      }
      .detailTime{
        display: block;
        width: 115px;
        height: 17px;
        font-size: 12px;
        font-weight: 400;
       color: #887e7e;
       line-height: 17px;
        margin-bottom: 10px;
      }
    }
}
  }
}
.task{
    margin-top: 20px;
    width: 100%;
    height: 188px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    padding: 25px;
}
.inout-charts{
    margin-top: 20px;
    height: 500px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    padding: 25px;
    .time{
      display: flex;
      justify-content: flex-end;
      .timeContainer{
      width: 206px;
      border: 1px solid #eee;
      .el-button{
        margin: 0;
        border: none;
        &:hover{
          background-color: #fff;
          color: #ffb200;
        }
        &.active{
          background-color: #ffb200;
          color: #fff;
        }
      }
    }
    }

}
.libs{
  display: flex;
  height: 354px;
  margin-top: 20px;
  .left{
    width: 30%;
    height: 354px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    padding: 25px;
    margin-right: 30px;
  }
  .right{
    width: 70%;
    height: 354px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    padding: 25px;
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
