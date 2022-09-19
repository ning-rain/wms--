<template>
  <div>
    <!-- 第一个折叠面板 -->
    <el-card>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="基础信息" name="1">
          <el-steps :active="5" align-center finish-status="success">
            <el-step
              v-for="(item,index) in timeList"
              :key="index"
              :title="item.title"
              :description="item.time"
            />
          </el-steps>
          <div class="baseInfo">
            <el-row>
              <el-col :span="6">
                <p>出库单号</p>
                <span>{{ detaiObj.code }}</span>
              </el-col>
              <el-col :span="6">
                <p>创建时间</p>
                <span>{{ detaiObj.createTime }}</span>
              </el-col>
              <el-col :span="6">
                <p>计划到达时间</p>
                <span>{{ detaiObj.planOutTime }}</span>
              </el-col>
              <el-col :span="6">
                <p>出库类型</p>
                <span>B2B出库</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p>仓库名称</p>
                <span>{{ detaiObj.warehouseName }}</span>
              </el-col>
              <el-col :span="6">
                <p>库区名称</p>
                <span>{{ detaiObj.areaName }}</span>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>

      </el-collapse>
    </el-card>
    <!-- 第二个折叠面板 -->
    <el-card style="margin-top:20px">
      <el-collapse v-model="activeNames1" @change="handleChange">
        <el-collapse-item title="货主信息" name="1">
          <div class="baseInfo">
            <el-row>
              <el-col :span="6">
                <p>货主编号</p>
                <span>{{ detaiObj.ownerCode }}</span>
              </el-col>
              <el-col :span="6">
                <p>货主名称</p>
                <span>{{ detaiObj.ownerName }}</span>
              </el-col>
              <el-col :span="6">
                <p>联系人</p>
                <span>{{ detaiObj.owner && detaiObj.owner.personName }}</span>
              </el-col>
              <el-col :span="6">
                <p>联系电话</p>
                <span>{{ detaiObj.owner && detaiObj.owner.phone }}</span>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>

      </el-collapse>
    </el-card>
    <!-- 第三个折叠面板 -->
    <el-card style="margin-top:20px">
      <el-collapse v-model="activeNames2" @change="handleChange">
        <el-collapse-item title="货品信息" name="1">
          <Table :page-sizes="pageSizes" :total="total" :table-date="list" :thead="thead">
            <template slot="btn">
              <div class="infoTip">
                总计：
                <span>{{ detaiObj.goodsTotal }}个</span>
                总体积：
                <span>{{ detaiObj.volumeTotal }}m³</span>
              </div>
            </template>
          </Table>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <!-- 第四个折叠面板 -->
    <el-card style="margin-top:20px">
      <el-collapse v-model="activeNames3" @change="handleChange">
        <el-collapse-item title="运输信息" name="1">
          <div class="baseInfo">
            <el-row>
              <el-col :span="6">
                <p>运单编号</p>
                <span>{{ detaiObj.billCode }}</span>
              </el-col>
              <el-col :span="6">
                <p>承运商</p>
                <span>{{ detaiObj.carrierName }}</span>
              </el-col>
              <el-col :span="6">
                <p>计划出库时间</p>
                <span>{{ detaiObj.planOutTime }}</span>
              </el-col>
              <el-col :span="6">
                <p>司机名称</p>
                <span>{{ detaiObj.driverName }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p>司机电话</p>
                <span>{{ detaiObj.driverPhone }}</span>
              </el-col>
              <el-col :span="6">
                <p>收货人名称</p>
                <span>{{ detaiObj.receiverName }}</span>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>

      </el-collapse>
    </el-card>
    <!-- 第五个折叠面板 -->
    <el-card style="margin-top:20px">
      <el-collapse v-model="activeNames4" @change="handleChange">
        <el-collapse-item title="任务信息" name="1">
          <div class="infoTip">
            拣货任务
          </div>
          <div class="baseInfo">
            <el-row>
              <el-col :span="6">
                <p>任务编号</p>
                <span>{{ detaiObj.pickingEntity && detaiObj.pickingEntity.code }}</span>
              </el-col>
              <el-col :span="6">
                <p>任务状态</p>
                <span>{{ pickingEntityStatus }}</span>
              </el-col>
              <el-col :span="6">
                <p>拣货人</p>
                <span>{{ detaiObj.pickingEntity && detaiObj.pickingEntity.personName }}</span>
              </el-col>
              <el-col :span="6">
                <p>开始时间</p>
                <span>{{ detaiObj.pickingEntity && detaiObj.pickingEntity.createTime }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p>完成时间</p>
                <span>{{ detaiObj.pickingEntity && detaiObj.pickingEntity.completionTime }}</span>
              </el-col>
            </el-row>
          </div>
          <div class="infoTip" style="margin-top:15px">
            交接任务
          </div>
          <div class="baseInfo">
            <el-row>
              <el-col :span="6">
                <p>任务编号</p>
                <span>{{ detaiObj.handoverEntity && detaiObj.handoverEntity.billCode }}</span>
              </el-col>
              <el-col :span="6">
                <p>任务状态</p>
                <span>{{ handoverEntityStatus }}</span>
              </el-col>
              <el-col :span="6">
                <p>交接人</p>
                <span>{{ detaiObj.handoverEntity && detaiObj.handoverEntity.handoverName }}</span>
              </el-col>
              <el-col :span="6">
                <p>开始时间</p>
                <span>{{ detaiObj.handoverEntity && detaiObj.handoverEntity.createTime }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p>完成时间</p>
                <span>{{ detaiObj.handoverEntity && detaiObj.handoverEntity.completionTime }}</span>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>

      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import { getDetails, getOutBound } from '@/api/storageOut'
import Table from '@/components/Table/index.vue'
export default {
  components: { Table },
  data() {
    return {
      activeNames: ['1'],
      activeNames1: ['2'],
      activeNames2: ['3'],
      activeNames3: ['4'],
      activeNames4: ['5'],
      detaiObj: {},
      timeList: [],
      list: [],
      size: 10,
      current: 1,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      thead: [
        {
          label: '货品编码',
          prop: 'goodsCode',
          width: '160'
        },
        {
          label: '货品条码',
          prop: 'goodsBarCode',
          width: '160'
        },
        {
          label: '货品名称',
          prop: 'goodsName',
          width: '160'
        },
        {
          label: '货品数量',
          prop: 'stockTotal'
        },
        {
          label: '体积(m³)',
          prop: 'goodsVolume',
          sortable: true
        },
        {
          label: '单位',
          prop: 'goodsUnit',
          width: '160',
          sortable: true
        },
        {
          label: '可用库存',
          prop: 'stockFree'
        },
        {
          label: '发货数量',
          prop: 'outboundNum'
        }
      ]
    }
  },
  computed: {
    pickingEntityStatus() {
      if (this.detaiObj && this.detaiObj.pickingEntity && this.detaiObj.pickingEntity.status === 1) {
        return '待分配'
      } else if (this.detaiObj && this.detaiObj.pickingEntity && this.detaiObj.pickingEntity.status === 2) {
        return '拣货中'
      } else {
        return '拣货完成'
      }
    },
    handoverEntityStatus() {
      if (this.detaiObj && this.detaiObj.handoverEntity && this.detaiObj.handoverEntity.status === 1) {
        return '新建'
      } else if (this.detaiObj && this.detaiObj.handoverEntity && this.detaiObj.handoverEntity.status === 2) {
        return '交接中'
      } else {
        return '交接完成'
      }
    }
  },
  created() {
    this.getDetails()
    this.getOutBound()
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    async getDetails() {
      try {
        const { data } = await getDetails(this.$route.params.id)
        // console.log(data)
        this.detaiObj = data
        console.log(this.detaiObj)
        data.timeArray.forEach(ele => {
          const arr = ['新建', '拣货中', '拣货完成', '交接中', '交接完成']
          this.timeList = arr.map(ele1 => {
            const obj = {}
            obj.title = ele1
            obj.time = ele
            return obj
          })
        })
        // console.log(this.timeList)
      } catch (e) {
        console.log(e)
      }
    },
    async getOutBound() { // 货品信息
      try {
        const { data } = await getOutBound({
          size: this.size,
          current: this.current,
          masterId: this.$route.params.id
        })

        this.list = data.records
        this.total = +data.total
        // console.log(this.list)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.baseInfo {
    background: #fdfcf9;
    border: 1px solid #f7f2f1;
    padding: 25px 30px;
    margin-top: 20px;
}
p {
  margin: 20px 0 0;
  color: #887e7e;
}
span {
  font-size: 13px;
  color: #303133;
  line-height: 1.769230769230769;
}
.el-collapse{
  border: unset;
}
 .el-collapse-item__wrap{
  border: none ;
}
.infoTip {
    display: inline-block;
    height: 32px;
    line-height: 30px;
    background: #fff9eb;
    border: 1px solid #ffb200;
    padding: 0 25px;
    font-size: 14px;

    span {
       color: #ffb200;;
    }
}
</style>
