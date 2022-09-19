<template>
  <div>
    <el-card class="box-card">
      <div class="step">
        <el-steps :active="active">
          <el-step title="填写基本信息" />
          <el-step title="填写盘点清单" />
        </el-steps>
      </div>
      <el-form v-if="fromShow" ref="formRef" :model="fromData" :rules="rules">
        <el-row>
          <el-col :span="6">
            <el-form-item label="盘点单号">
              <el-input
                v-model="fromData.code"
                placeholder="请输入内容"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="盘点原因" prop="reason">
              <el-select v-model="fromData.reason" clearable placeholder="请选择">
                <el-option
                  v-for="item in reason"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="盘点维度" prop="dimension">
              <el-select v-model="fromData.dimension" clearable placeholder="请选择">
                <el-option
                  v-for="item in dimension"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="盘点类型" prop="type">
              <el-select v-model="fromData.type" clearable placeholder="请选择">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col v-if="fromData.dimension === '' || fromData.dimension === 'KW'" :span="6">
            <el-form-item label="库区" prop="areaId">
              <el-cascader
                v-model="fromData.areaId"
                :options="options"
                @expand-change="expandChange"
                @change="handleChange"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="fromData.dimension === '' || fromData.dimension === 'HP'" :span="6">
            <el-form-item label="货主" prop="ownerId">
              <el-select v-model="fromData.ownerId" clearable placeholder="请选择">
                <el-option
                  v-for="item in owner"
                  :key="item.prop"
                  :label="item.label"
                  :value="item.prop"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="计划时间" prop="planCheckTime">
              <el-date-picker
                v-model="fromData.planCheckTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-card v-else>
        <div slot="header">
          <el-button type="success" round @click="addCheckList">添加盘点清单</el-button>
          <el-button round>删除盘点清单</el-button>
        </div>
        <div class="emptyTip">
          <span class="imgIcon" />
          <p>暂无盘点清单</p>
        </div>
        <!-- <Table :thead="thead" :show-box="true" :table-date="checkList" /> -->
      </el-card>
      <div class="buttonBox">
        <el-button round @click="$router.back()">返回</el-button>
        <el-button v-if="fromShow" type="warning" round @click="addCheck">下一步</el-button>
        <el-button v-else type="warning" round @click="submitBtn">提交</el-button>
      </div>
    </el-card>
    <addCheckList ref="addCheckList" :dialog-visible.sync="dialogVisible" :check-list="checkList" :dimension="Dimension" />
  </div>
</template>

<script>
import { getNextCodeFactory, getOwnerList, getWarehouseList, getWarehouseAreaList, addCheck, getStock, getCheckInfo } from '@/api/ManageStorage'
import addCheckList from './addCheckList.vue'
export default {
  components: {
    addCheckList
  },
  data() {
    return {
      fromData: {
        code: '', // 单号
        reason: '', // 原因
        dimension: '', // 维度
        type: '', // 类型
        areaId: '', // 库区
        ownerId: '', // 货主id
        id: '',
        status: 1, // 状态
        warehouseId: '', // 仓库ID
        planCheckTime: '' // 计划盘点时间
      },
      thead: [
        { label: '仓库名称', prop: 'warehouseName' },
        { label: '库区名称', prop: 'areaName' },
        { label: '库位编号', prop: 'locationCode' },
        { label: '库位名称', prop: 'locationName' },
        { label: '货品名称', prop: 'goodsName' },
        { label: '货品编码', prop: 'goodsCode' },
        { label: '货品条码', prop: 'goodsBarCode' },
        { label: '货主名称', prop: 'ownerName' },
        { label: '库存数量', prop: 'total' }
      ],
      rules: {
        reason: [{ required: true, message: '请选择' }],
        dimension: [{ required: true, message: '请选择' }],
        type: [{ required: true, message: '请选择' }],
        areaId: [{ required: true, message: '请选择' }],
        ownerId: [{ required: true, message: '请选择' }],
        planCheckTime: [{ required: true, message: '请选择' }]
      },
      active: 0,
      reason: [
        { label: '规划', value: 'GH' },
        { label: '货主', value: 'HZ' },
        { label: '差异', value: 'CY' }
      ],
      dimension: [
        { label: '库位', value: 'KW' },
        { label: '货品', value: 'HP' }
      ],
      type: [
        { label: '随机盘点', value: 'SJPD' },
        { label: '计划盘点', value: 'JHPD' }
      ],
      owner: [],
      options: [],
      optionsChildren: [],
      fromShow: true,
      dialogVisible: false,
      checkList: [],
      Dimension: ''
    }
  },
  mounted() {
    this.getNextCodeFactory()
    this.getOwnerList()
    this.getWarehouseList()
  },
  methods: {
    async getNextCodeFactory() {
      const { data } = await getNextCodeFactory('PD')
      this.fromData.code = data
    },
    // 获取货主列表
    async getOwnerList() {
      const { data } = await getOwnerList()
      console.log(data)
      this.owner = data.map(ele => {
        return { prop: ele.id, value: ele.name, label: ele.name }
      })
    },
    // 获取仓库列表
    async getWarehouseList() {
      const { data } = await getWarehouseList({ status: 1 })
      console.log(data)
      this.options = data.map(ele => {
        return { value: ele.id, label: ele.name, children: [] }
      })
      if (this.$route.params.id) {
        await this.getCheckInfo()
        console.log(this.fromData.warehouseId)
        this.expandChange([this.fromData.warehouseId])
      }
    },
    // 获取库区列表
    async expandChange(val) {
      console.log(val)
      const { data } = await getWarehouseAreaList({
        WarehouseId: val[0],
        status: 1
      })
      console.log(data)
      this.optionsChildren = data.map(ele => {
        return { value: ele.id, label: ele.name }
      })
      const index = this.options.findIndex(ele => ele.value === val[0])
      this.options[index].children = [...this.optionsChildren]
    },
    handleChange(val) {
      console.log(val)
      this.fromData.warehouseId = val[0]
      this.fromData.areaId = val[1]
    },
    addCheck() {
      this.$refs.formRef.validate(async(vali) => {
        if (vali) {
          const { data } = await addCheck(this.fromData)
          this.Dimension = data.dimension
          this.$message.success('提交成功')
          this.fromShow = false
          this.active++
        }
      })
    },
    async addCheckList() {
      this.dialogVisible = true
      const { data } = await getStock({
        ownerId: this.fromData.ownerId,
        goodsName: this.$refs.addCheckList.fromData.goodsName,
        current: 1,
        size: 10,
        needFree: 1
      })
      console.log(data)
      this.checkList = data.records
    },
    submitBtn() {
      this.$router.push('/manage-storage/list')
      this.active++
    },
    // 获取盘点信息
    async getCheckInfo() {
      const id = this.$route.params.id
      const { data } = await getCheckInfo(id, { 0: id })
      console.log(data)
      this.fromData = data
    }
  }
}
</script>

<style lang='scss' scope>
.step {
  width: 440px;
    margin: 0 auto;
    height: 100px;
    margin-top: 56px;
}
.el-col {
  padding: 0 15px;
  input {
    width: 280px;
    background: #f8f5f5;
  }
}
.emptyTip {
    padding: 100px 0;
    margin: 0 auto;
    color: #b5abab;
    font-size: 14px;
    text-align: center;
  .imgIcon {
    width: 160px;
      height: 160px;
      display: inline-block;
      background: url(~@/assets/dashboard-banner.png) no-repeat;
      background-size: contain;
  }
}
.buttonBox {
      padding: 25px 0 0;
    margin: 0 -30px -5px;
    border-top: 1px solid #f5efee;
    text-align: center;
}
.el-step__head.is-finish {
    border-color: #ffb200 !important;
}
.is-finish {
    color: #ffb200 !important;
}
</style>
