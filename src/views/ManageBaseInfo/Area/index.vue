<template>
  <div>
    <SearchCard
      :config="setForm"
      @getFormData="searchData"
      @reset="getAreaList"
    />
    <!-- @reset="getwarehouseList" -->
    <Table
      :thead="tableLabel"
      :table-date="tableData"
      :total="total"
      @changeSize="changeSize"
      @changePage="changePage"
    >
      <template #btn>
        <el-button round @click="openAddDialog">新增库区</el-button>
        <span style="float: right">
          <el-button round @click="downLoad">下载库区模板</el-button>
          <el-button
            round
            @click="dialogVisible = true"
          >导入库区信息</el-button>
        </span>
      </template>
      <template #temperatureType="{ scoped: { row } }">{{
        formatTemperature(row)
      }}</template>
      <template #bearingType="{ scoped: { row } }">{{
        formatBearing(row)
      }}</template>
      <template #useType="{ scoped: { row } }">{{
        formatUseType(row)
      }}</template>
      <template #status="{ scoped: { row } }">{{
        row.status ? "启用" : "禁用"
      }}</template>
      <template #operate="{ scoped: { row } }">
        <span class="operate-btn" @click="editWareHouse(row)">编辑</span>
        <span class="operate-btn" @click="editStatus(row)">{{
          row.status ? "禁用" : "启用"
        }}</span>
        <span class="operate-btn" @click="delWareHouse(row)">删除</span>
      </template>
    </Table>
    <UploadDialog :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { getAreaList, delArea, editArea } from '@/api/manageBaseInfo'
import UploadDialog from './components/uploadDialog.vue'
export default {
  components: {
    UploadDialog
  },
  data() {
    return {
      setForm: [
        { label: '仓库名称', prop: 'warehouseName' },
        { label: '库区名称', prop: 'name' },
        {
          label: '仓库状态',
          prop: 'status',
          type: 'select',
          children: [
            { label: '全部', value: null },
            { label: '禁用', value: 0 },
            { label: '启用', value: 1 }
          ]
        }
      ],
      tableLabel: [
        { prop: 'warehouseName', label: '所属仓库' },
        { prop: 'code', label: '库区编号', width: '100' },
        { prop: 'name', label: '库区名称', width: '100' },
        {
          prop: 'temperatureType',
          label: '温度类型',
          slotName: 'temperatureType'
        },
        { prop: 'bearingType', label: '承重类型', slotName: 'bearingType' },
        { prop: 'useType', label: '用途类型', slotName: 'useType' },
        { prop: 'status', label: '库区状态', slotName: 'status' },
        { prop: 'personName', label: '负责人' },
        { prop: 'phone', label: '联系电话', width: '150' },
        { prop: 'includedNum', label: '库位数量' },
        { prop: 'updateTime', label: '更新时间', width: '180' },
        { label: '操作', slotName: 'operate', fixed: 'right', width: '150' }
      ],
      total: '',
      pageSize: '',
      tableData: [],
      dialogVisible: false
    }
  },
  created() {
    this.getAreaList()
  },
  methods: {
    searchData(form) {
      this.getAreaList(1, 10, form)
      // console.log(form);
    },
    async getAreaList(current = 1, size = 10, form) {
      const { data } = await getAreaList({ current, size, ...form })
      this.total = data.total - 0
      this.pageSize = size
      this.tableData = data.records
      console.log(data)
    },
    changeSize(val) {
      this.pageSize = val
      this.getAreaList(1, val)
    },
    changePage(val) {
      this.getAreaList(val, this.pageSize)
    },
    openAddDialog() {
      this.$router.push('/manage-base-info/area/details/null')
    },
    editWareHouse(row) {
      this.$router.push(`/manage-base-info/area/details/${row.id}`)
      this.$store.commit('manageBaseInfo/SET_DETAILS', row)
      const index = this.$store.state.app.navArr.length - 1
      this.$store.commit('app/EDIT_NAVBARITEM', { index, title: '修改库区' })
      console.log(row)
    },
    editStatus(row) {
      this.$confirm(
        `确定要${row.status ? '禁用' : '启用'}：${row.name} 吗？`,
        `确认${row.status ? '禁用' : '启用'}`,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(async() => {
          const status = row.status ? '0' : '1'
          await editArea({ id: row.id, status })
          this.getAreaList()
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
    },
    async delWareHouse(row) {
      this.$confirm(`确定要删除：${row.name} 吗？`, `确定删除`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await delArea({ ids: [row.id] })
          this.getAreaList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    formatTemperature(row) {
      if (row.temperatureType == 'CW') {
        return '常温'
      } else if (row.temperatureType == 'LC') {
        return '冷藏'
      } else {
        return '恒温'
      }
    },
    formatBearing(row) {
      if (row.bearingType == 'QX') {
        return '轻型'
      } else if (row.bearingType == 'ZX') {
        return '重型'
      } else {
        return '中型'
      }
    },
    formatUseType(row) {
      if (row.useType == 'CKHCQ') {
        return '出库缓存区'
      } else if (row.useType == 'RKHCQ') {
        return '入库缓存区'
      } else if (row.useType == 'ZJQ') {
        return '质检区'
      } else if (row.useType == 'CCQ') {
        return '存储区'
      } else {
        return '分拣区'
      }
    },
    downLoad() {
      import('@/utils/Vendor/index').then((excel) => {
        excel.export_json_to_excel({
          header: [
            '所属仓库名称',
            '库区名称',
            '温度类型',
            '承重类型',
            '库区类型',
            '用途属性',
            '库区状态',
            '负责人',
            '联系电话'
          ], // 表头 必填
          data: [[], [], [], [], [], [], [], [], []], // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
          // multiHeader: [["姓名", "主要信息", "", "", "", "", ""]],
          // merges: ["A1:A2", "B1:G1"],
        })
      })
    }
  }
}
</script>

<style>
.operate-btn {
  font-size: 13px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #ffb200;
  cursor: pointer;
  border-color: transparent;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
  outline: 0;
  margin-left: 8px;
  margin-right: 8px;
}
</style>
