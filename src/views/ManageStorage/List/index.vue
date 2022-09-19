<template>
  <div>
    <SearchCard
      :config="config"
      :options="options"
      @getFormData="search"
      @getWarehouseArea="getWarehouseArea"
    />
    <Table
      ref="table"
      :loading="loading"
      :show-box="true"
      :thead="thead"
      :table-date="tableDate"
      :total="total"
      @changeSize="changeSize"
      @changePage="handleCurrentChange"
    >
      <template slot="btn">
        <el-button type="success" round style="background-color:#00be76" @click="addBtn">新增盘点单</el-button>
        <el-button class="createBtn" round @click="createCheckTasks">生成盘点任务</el-button>
      </template>
      <template #operation="scoped">
        <el-button v-if="scoped.scoped.row.status !== '新建'" @click="toCheckInfo(scoped)">查看详情</el-button>
        <span v-else>
          <el-button @click="editBtn(scoped)">修改详情</el-button>
          <el-button @click="createCheckTask(scoped)">生成盘点任务</el-button>
          <el-button @click="cancelBtn(scoped.scoped.row)">取消</el-button>
        </span>
      </template>
    </Table>
    <CreateCheckTask :dialog-visible.sync="dialogVisible" :errors="data.errors" :results="data.results" />
  </div>
</template>

<script>
import { getCheckList, getOwnerList, getWarehouseList, getWarehouseAreaList, cancelCheck, createCheckTask } from '@/api/ManageStorage'
import SearchCard from './components/SearchCard.vue'
import CreateCheckTask from './components/createCheckTask.vue'
import Table from './components/table.vue'
export default {
  components: {
    SearchCard,
    Table,
    CreateCheckTask
  },
  data() {
    return {
      config: [
        { prop: 'code', label: '盘点单号', type: '' },
        { prop: 'status', label: '盘点状态', type: 'select',
          children: [
            { prop: '1', label: '新建', value: '1' },
            { prop: '2', label: '一盘中', value: '2' },
            { prop: '3', label: '一盘完成', value: '3' },
            { prop: '4', label: '复盘中', value: '4' },
            { prop: '5', label: '复盘完成', value: '5' },
            { prop: '6', label: '已取消', value: '6' }
          ] },
        { prop: 'type', label: '盘点类型', type: 'select',
          children: [
            { prop: 'SJPD', label: '随机盘点', value: 'SJPD' },
            { prop: 'JHPD', label: '计划盘点', value: 'JHPD' }
          ] },
        { prop: 'ownerName', label: '货主', type: 'select',
          children: [] },
        { prop: 'areaId', label: '盘点库区', type: 'cascader' }
      ],
      thead: [
        { label: '盘点单号', prop: 'code', slotName: '', filter: '' },
        { label: '货主', prop: 'ownerName', slotName: '', filter: '' },
        { label: '盘点单状态', prop: 'status', slotName: '', filter: true,
          options: [
            { text: '新建', prop: 1, value: '新建' },
            { text: '一盘中', prop: 2, value: '一盘中' },
            { text: '一盘完成', prop: 3, value: '一盘完成' },
            { text: '复盘中', prop: 4, value: '复盘中' },
            { text: '复盘完成', prop: 5, value: '复盘完成' },
            { text: '已取消', prop: 6, value: '已取消' }
          ] },
        { label: '创建时间', prop: 'createTime', slotName: '', filter: '' },
        { label: '计划盘点时间', prop: 'planCheckTime', slotName: '', filter: '' },
        { label: '盘点原因', prop: 'reason', slotName: '', filter: true,
          options: [
            { value: '规划', prop: 'GH', text: '规划' },
            { value: '货主', prop: 'HZ', text: '货主' },
            { value: '差异', prop: 'CY', text: '差异' }
          ] },
        { label: '盘点维度', prop: 'dimension', slotName: '', filter: true,
          options: [
            { text: '库位', prop: 'KW', value: '库位' },
            { text: '货品', prop: 'HP', value: '货品' }
          ] },
        { label: '盘点类型', prop: 'type', slotName: '', filter: true,
          options: [
            { text: '随机盘点', value: '随机盘点', prop: 'SJPD' },
            { text: '计划盘点', value: '计划盘点', prop: 'JHPD' }
          ] },
        { label: '盘点仓库', prop: 'warehouseName', slotName: '', filter: '' },
        { label: '盘点库区', prop: 'areaName', slotName: '', filter: '' },
        { label: '创建人', prop: 'createName', slotName: '', filter: '' },
        { label: '操作', prop: '查看详情', slotName: 'operation', filter: '' }
      ],
      tableDate: [],
      options: [],
      optionsChildren: [],
      page: {
        current: 1,
        size: 10
      },
      total: 1,
      loading: false,
      dialogVisible: false,
      data: {}
    }
  },
  mounted() {
    this.search()
    this.getOwnerList()
    this.getWarehouseList()
    console.log(this.$refs.table.multipleSelection)
  },
  methods: {
    // 搜索盘点单
    async search(val) {
      this.loading = true
      const { data } = await getCheckList({
        ...val,
        ...this.page
      })
      console.log(data)
      this.total = +data.total
      data.records.forEach(item => {
        this.thead[2].options.map(ele => {
          if (ele.prop === item.status) {
            item.status = ele.text
          }
          if (item.status === 0) {
            item.status = ''
          }
        })
        this.thead[5].options.map(ele => {
          if (ele.prop === item.reason) {
            item.reason = ele.value
          }
        })
        this.thead[6].options.map(ele => {
          if (ele.prop === item.dimension) {
            item.dimension = ele.text
          }
        })
        this.thead[7].options.map(ele => {
          if (ele.prop === item.type) {
            item.type = ele.text
          }
        })
      })
      this.tableDate = data.records
      this.loading = false
    },
    // 改变每页条数
    changeSize(val) {
      console.log(val)
      this.page.size = val
      this.search()
    },
    // 切换页码
    handleCurrentChange(val) {
      this.page.current = val
      this.search()
    },
    // 获取货主列表
    async getOwnerList() {
      const { data } = await getOwnerList()
      console.log(data)
      this.config[3].children = data.map(ele => {
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
    },
    // 获取库区列表
    async getWarehouseArea(val) {
      console.log(val)
      const { data } = await getWarehouseAreaList({
        WarehouseId: val,
        status: 1
      })
      console.log(data)
      this.optionsChildren = data.map(ele => {
        return { value: ele.id, label: ele.name }
      })
      const index = this.options.findIndex(ele => ele.value === val)
      this.options[index].children = [...this.optionsChildren]
    },
    // 前往盘点详情
    toCheckInfo(scoped) {
      this.$router.push({
        path: `/manage-storage/list/list-detail/${scoped.scoped.row.id}`
      })
    },
    // 取消盘点
    async cancelBtn(val) {
      await cancelCheck({ id: val.id })
      this.search()
    },
    editBtn(scoped) {
      this.$router.push({
        path: `/manage-storage/list/details/${scoped.scoped.row.id}`
      })
      const index = this.$store.state.app.navArr.length - 1
      this.$store.commit('app/EDIT_NAVBARITEM', { index, title: '编辑盘点单' })
    },
    addBtn() {
      this.$router.push({
        path: '/manage-storage/list/details/null'
      })
    },
    async createCheckTask(scoped) {
      const { data } = await createCheckTask([scoped.scoped.row.id])
      console.log(data)
      this.data = data
      this.dialogVisible = true
    },
    async createCheckTasks() {
      if (!this.$refs.table.multipleSelection.length) {
        return this.$message.error('请勾选')
      }
      const arr = this.$refs.table.multipleSelection.map(ele => {
        return ele.id
      })
      const { data } = await createCheckTask(arr)
      console.log(data)
      this.data = data
      this.dialogVisible = true
      this.$refs.table.$refs.table.clearSelection()
    }
  }
}
</script>

<style lang='scss'>
.createBtn {
  background-color: #f8f5f5;
  color:#332929;
  border: none;
}
.cell {
  .el-button {
    padding: 0;
    border: none;
    color: #ffb200;
  }
}
</style>
