<template>
  <el-dialog title="查看上架信息" :visible.sync="showDialog" width="1080px" :before-close="handleClose">
    <div
      class="divDesc"
      style="padding-top: 12px;padding-bottom: 16px;border-top:1px solid #f4efee;border-bottom:1px solid #"
    >
      <el-row style="margin-left: -13px; margin-right: -47px;display: flex;">
        <el-row :span="4" style="padding-left: 47px; padding-right: 47px;">
          <p>货品编号</p>
          <p>{{rowOBj.goodsCode}}</p>
        </el-row>
        <el-row :span="4" style="padding-left: 47px; padding-right: 47px;">
          <p>货品名称</p>
          <p>{{rowOBj.goodsName}}</p>
        </el-row>
        <el-row :span="4" style="padding-left: 47px; padding-right: 47px;">
          <p>货品类型</p>
          <p>{{rowOBj.goodsTypeName}}</p>
        </el-row>
        <el-row :span="4" style="padding-left: 47px; padding-right: 47px;">
          <p>货品数量</p>
          <p>{{rowOBj.realNum}}</p>
        </el-row>
        <el-row :span="4" style="padding-left: 47px; padding-right: 47px;">
          <p>货主名称</p>
          <p>{{rowOBj.ownerName}}</p>
        </el-row>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <div class="buttonBox">
        <el-button
          round
          style="width:100px;background-color:#f8f5f5;width:180px;margin-right:20px;color:black;"
          class="importantButton"
          @click="returnFn"
        >返回</el-button>
      </div>
    </span>

    <el-table
      border
      :form="form"
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: 'rgb(249,246,238)' }"
    >
      <el-table-column label="实上库位">
        <template #default="{row}">
          <el-input disabled v-model="row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="实上数量"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { getLocation } from '@/api/ListInList'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    rowOBj: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // choice: '',
      areaId: this.rowOBj.locationPlanEntities[0].areaId,
      page: {
        masterId: this.rowOBj,
        current: 1,
        size: 10,
      },
      tableData: [],
      form: {
        choice: '',
      },
    }
  },
  created() {
    this.getLocation()
  },
  watch: {
    'form.choice': {
      immediate: true,
      handler(val) {
        console.log(val)
        this.form.choice = val
      },
    },
  },
  methods: {
    handleClose() {
      this.$parent.showDialogBtn = false
    },
    async getLocation() {
      try {
        // console.log('23', this.areaId)
        const res = await getLocation({ areaId: this.areaId })
        // this.$set(this.form, 'choice', res.data[3].name)
        this.tableData = res.data
        // this.tableData[0].choice = res.data[3].name
        console.log('nihao', res)
        console.log(this.form.choice)
      } catch (error) {
        console.log(error)
      }
    },
    // 返回按钮
    returnFn() {
      this.$parent.showDialogBtn = false
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  width: 330px;
}
.buttonBox {
  padding: 25px 0 0;
  margin: -20px -30px -5px;
  border-top: 1px solid #f5efee;
  text-align: center;
  .importantButton:hover {
    background-color: #f4b53f !important;
  }
}
</style>

