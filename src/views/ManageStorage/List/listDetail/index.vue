<template>
  <div>
    <!-- 基础信息 -->
    <el-card class="box-card">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基础信息" name="1">
          <div class="divSteps">
            <el-steps v-if="baseInfo.status==6" :active="2">
              <el-step title="新建" :description="baseInfo.createTime " />
              <el-step title="已取消" :description="baseInfo.updateTime " />
            </el-steps>
            <el-steps v-else :active="baseInfo.status">
              <el-step title="新建" :description="baseInfo.createTime " />
              <el-step v-if="baseInfo.status<=1" title="一盘中" />
              <el-step v-else title="一盘中" :description="baseInfo.checkTaskEntity1.createTime" />
              <el-step v-if="baseInfo.status<=2" title="一盘完成" />
              <el-step v-else title="一盘完成" :description="baseInfo.checkTaskEntity1.planTaskTime" />
              <el-step v-if="baseInfo.status<=3" title="复盘中" />
              <el-step v-else title="复盘中" :description="baseInfo.checkTaskEntity2.createTime" />
              <el-step v-if="baseInfo.status<=4" title="复盘完成" />
              <el-step v-else title="复盘完成" :description="baseInfo.checkTaskEntity2.planTaskTime" />
            </el-steps>
          </div>
          <div class="baseInfo">
            <el-row>
              <el-col :span="6">
                <p>盘点单号</p>
                <p>{{ baseInfo.code }}</p>
              </el-col>
              <el-col :span="6">
                <p>创建时间</p>
                <p>{{ baseInfo.createTime }}</p>
              </el-col>
              <el-col :span="6">
                <p>计划盘点时间</p>
                <p>{{ baseInfo.planCheckTime }}</p>
              </el-col>
              <el-col :span="6">
                <p>盘点原因</p>
                <p>{{ baseInfo.reason }}</p>
              </el-col>
            </el-row>
            <el-row style="padding-top: 20px">
              <el-col :span="6">
                <p>盘点维度</p>
                <p>{{ baseInfo.dimension }}</p>
              </el-col>
              <el-col :span="6">
                <p>盘点类型</p>
                <p>{{ baseInfo.type }}</p>
              </el-col>
              <el-col :span="6">
                <p>盘点仓库</p>
                <p>{{ baseInfo.warehouseName }}</p>
              </el-col>
              <el-col :span="6">
                <p>盘点库区</p>
                <p>{{ baseInfo.areaName }}</p>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <!-- 盘点清单 -->
    <el-card v-if="baseInfo.status>=2 && baseInfo.status<=5" class="box-card">
      <el-collapse>
        <el-collapse-item title="盘点清单">
          <div>
            <div class="infoTip">总计：{{ totalLocation }}个库位 {{ totalStock }}个货品</div>
            <Table :thead="thead" :table-date="checkList" />
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <!-- 盘点任务 -->
    <el-card v-if="baseInfo.status>=2 && baseInfo.status<=5" class="box-card">
      <el-collapse>
        <el-collapse-item title="盘点任务">
          <div>
            <div class="infoTip">一盘</div>
            <div class="baseInfo">
              <el-row>
                <el-col :span="6">
                  <p>任务编号</p>
                  <p>{{ baseInfo.checkTaskEntity1.checkCode }}</p>
                </el-col>
                <el-col :span="6">
                  <p>盘点次数</p>
                  <p>{{ baseInfo.checkTaskEntity1.checkNum }}</p>
                </el-col>
                <el-col :span="6">
                  <p>任务状态</p>
                  <p>{{ baseInfo.checkTaskEntity1.checkCode }}</p>
                </el-col>
                <el-col :span="6">
                  <p>开始时间</p>
                  <p>{{ baseInfo.checkTaskEntity1.createTime }}</p>
                </el-col>
              </el-row>
              <el-row style="padding-top: 20px">
                <el-col :span="6">
                  <p>完成时间</p>
                  <p>{{ baseInfo.checkTaskEntity1.planTaskTime }}</p>
                </el-col>
                <el-col :span="6">
                  <p>盘点人</p>
                  <p>{{ baseInfo.checkTaskEntity1.personName }}</p>
                </el-col>
                <el-col :span="6">
                  <p>盘点数量</p>
                  <p>{{ baseInfo.checkTaskEntity1.checkTotal }}</p>
                </el-col>
                <el-col :span="6">
                  <p>损益合计</p>
                  <p />
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-if="baseInfo.status>=4 && baseInfo.status<=5">
            <div class="infoTip">复盘</div>
            <div class="baseInfo">
              <el-row>
                <el-col :span="6">
                  <p>任务编号</p>
                  <p>{{ baseInfo.checkTaskEntity2.checkCode }}</p>
                </el-col>
                <el-col :span="6">
                  <p>盘点次数</p>
                  <p>{{ baseInfo.checkTaskEntity2.checkNum }}</p>
                </el-col>
                <el-col :span="6">
                  <p>任务状态</p>
                  <p>{{ baseInfo.checkTaskEntity2.checkCode }}</p>
                </el-col>
                <el-col :span="6">
                  <p>开始时间</p>
                  <p>{{ baseInfo.checkTaskEntity2.createTime }}</p>
                </el-col>
              </el-row>
              <el-row style="padding-top: 20px">
                <el-col :span="6">
                  <p>完成时间</p>
                  <p>{{ baseInfo.checkTaskEntity2.planTaskTime }}</p>
                </el-col>
                <el-col :span="6">
                  <p>盘点人</p>
                  <p>{{ baseInfo.checkTaskEntity2.personName }}</p>
                </el-col>
                <el-col :span="6">
                  <p>盘点数量</p>
                  <p>{{ baseInfo.checkTaskEntity2.checkTotal }}</p>
                </el-col>
                <el-col :span="6">
                  <p>损益合计</p>
                  <p />
                </el-col>
              </el-row>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import { getCheckInfo, getCheckListList } from '@/api/ManageStorage'
import backInfo from '@/api/constant/user'
export default {
  data() {
    return {
      backReason: backInfo.backReason,
      baseInfo: {},
      checkList: [],
      activeNames: ['1'],
      thead: [
        { label: '仓库名称', prop: 'warehouseName' },
        { label: '库区名称', prop: 'areaName' },
        { label: '库位名称', prop: 'locationName' },
        { label: '货品名称', prop: 'goodsName' },
        { label: '货品编码', prop: 'goodsCode' },
        { label: '货品条码', prop: 'goodsBarCode' },
        { label: '货主名称', prop: 'ownerName' },
        { label: '库存数量', prop: 'stockNum' }
      ]
    }
  },
  computed: {
    totalLocation() {
      return this.checkList.reduce((per, next) => {
        return per + next.logicDel
      }, 0)
    },
    totalStock() {
      return this.checkList.reduce((per, next) => {
        return per + next.stockNum
      }, 0)
    }
  },
  mounted() {
    this.getCheckInfo()
    this.getCheckListList()
  },
  methods: {
    async getCheckInfo() {
      const id = this.$route.params.id
      const { data } = await getCheckInfo(id, { 0: id })
      console.log(data)
      const obj = backInfo.backReason.find(ele => ele.prop === data.reason)
      data.reason = obj ? obj.value : ''
      const obj1 = backInfo.backDimension.find(ele => ele.prop === data.dimension)
      data.dimension = obj1 ? obj1.value : ''
      const obj2 = backInfo.backType.find(ele => ele.prop === data.type)
      data.type = obj2 ? obj2.value : ''
      this.baseInfo = data
    },
    async getCheckListList() {
      const { data } = await getCheckListList({
        current: 1,
        size: 10,
        masterId: this.$route.params.id,
        status: 1
      })
      console.log(data)
      this.checkList = data.records
    }
  }
}
</script>

<style lang='scss' scope>
.box-card {
  margin-bottom: 25px;
}
.el-step__head.is-finish {
    border-color: #ffb200 !important;
}
.is-finish {
    color: #ffb200 !important;
}
.el-card__body {
    padding: 0 20px;
    .el-collapse {
        border-top: 0;
        border-bottom: 0;
        .el-collapse-item__header{
            border-bottom: 0;
        }
        .el-collapse-item__wrap {
            border-bottom: 0;
        }
    }
}
.divSteps {
    width: 70%;
    margin: 22px auto 37px;
}
.baseInfo {
    background: #fdfcf9;
    border: 1px solid #f7f2f1;
    padding: 25px 30px;
    p {
        margin: 0;
    }
}
.el-card {
  border: none;
  box-shadow: none;
}
.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
  box-shadow: none;

}
.table-card[data-v-3363c4d1] {
  margin-top: 0;
  border-radius: 0;
}
.table-card[data-v-3363c4d1] .el-card__body {
  padding-top: 0;
}
.infoTip {
    display: inline-block;
    height: 32px;
    line-height: 30px;
    background: #fff9eb;
    border: 1px solid #ffb200;
    padding: 0 25px;
    margin: 20px 0;
}
</style>
