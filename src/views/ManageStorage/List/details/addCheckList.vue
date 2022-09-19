<template>
  <el-dialog
    title="添加盘点清单"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="fromData">
      <el-row type="flex" justify="space-between" align="bottom">
        <el-col v-if="dimension === 'HP'" :span="12">
          <p>货品名称</p>
          <el-input v-model="fromData.goodsName" placeholder="请输入" />
        </el-col>
        <el-col v-else :span="18">
          <el-row>
            <el-col :span="12" style="padding-right: 10px">
              <p>库位名称</p>
              <el-input v-model="fromData.locationName" placeholder="请输入" />
            </el-col>
            <el-col :span="12">
              <p>库位编号</p>
              <el-input v-model="fromData.locationCode" placeholder="请输入" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row type="flex" justify="end" align="bottom">
            <el-button type="warning" round>搜索</el-button>
            <el-button round @click="resetForm">重置</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="checkList.length">
      <div v-if="checkList.length" class="infoTip">当前已选 {{ checkList.length }}个货品</div>
      <Table :thead="thead" :show-box="true" :table-date="checkList" />
    </div>
    <div v-else class="emptyTip">
      <span class="imgIcon" />
      <p>暂无盘点清单</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button round @click="handleClose">取 消</el-button>
      <el-button type="warning" round @click="addCheckList">确认添加</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    checkList: {
      type: Array,
      default: () => []
    },
    dimension: {
      type: String,
      default: 'HP'
    }
  },
  data() {
    return {
      fromData: {
        goodsName: '',
        locationName: '',
        locationCode: ''
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
      ]
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    addCheckList() {
      this.handleClose()
    },
    resetForm() {
      this.$refs.form.resetFields()
      this.fromData = {
        goodsName: ''
      }
    }
  }
}
</script>
<style lang='scss' scoped>
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
.el-col {
  padding: 0 !important;
}
.infoTip {
    display: inline-block;
    height: 32px;
    line-height: 30px;
    background: #fff9eb;
    border: 1px solid #ffb200;
    padding: 0 25px;
    margin: 20px 0 0;
}
</style>
