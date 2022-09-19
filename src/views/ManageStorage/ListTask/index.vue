<template>
  <div>
    <SearchCard
      :config="config"
      @getFormData="search"
    />
    <Table
      ref="table"
      :thead="thead"
      :show-box="true"
      :table-date="tableDate"
      :total="total"
      @changeSize="changeSize"
      @changePage="handleCurrentChange"
    >
      <template slot="btn">
        <el-button type="success" round style="background-color:#00be76" @click="increaseDecreases">生成损益单</el-button>
        <el-button class="createBtn" round @click="createTasks">生成复盘</el-button>
      </template>
      <template #operation="scoped">
        <el-button v-if="scoped.scoped.row.status == '待分配'" @click="distributeCheckTask(scoped)">分配</el-button>
        <span v-else-if="scoped.scoped.row.status == '盘点中'">
          <el-button @click="editCheck(scoped.scoped.row)">盘点录入</el-button>
          <el-button @click="checkOk(scoped)">完成盘点</el-button>
        </span>
        <span v-else-if="scoped.scoped.row.status == '已生成损益'">
          <el-button @click="toCheckTaskInfo(scoped.scoped.row)">查看详情</el-button>
          <el-button @click="increaseDecreaseInfo(scoped.scoped.row)">查看损益明细</el-button>
        </span>
        <span v-else-if="scoped.scoped.row.status == '盘点已完成'">
          <el-button @click="toCheckTaskInfo(scoped.scoped.row)">查看详情</el-button>
          <el-button @click="increaseDecrease(scoped.scoped.row)">生成损益</el-button>
          <el-button @click="createTask(scoped.scoped.row)">生成复盘</el-button>
        </span>
        <span v-else>
          <el-button @click="toCheckTaskInfo(scoped.scoped.row)">查看详情</el-button>
        </span>
      </template>
    </Table>
    <!-- 分配弹窗 -->
    <el-dialog
      title="人员分配"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="负责人">
          <el-select v-model="form.personName" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button round @click="handleClose">取 消</el-button>
        <el-button type="warning" round @click="sureDistribute">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 完成盘点弹窗 -->
    <el-dialog
      title="盘点完成"
      :visible.sync="checkOkDialog"
      width="30%"
      :before-close="handleClose"
    >
      <p>确认盘点完成吗？</p>
      <p>完成后不能修改盘点结果</p>
      <span slot="footer" class="dialog-footer">
        <el-button round @click="handleClose">取 消</el-button>
        <el-button type="warning" round @click="sureCheck">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 损益单/复盘 生成结果  -->
    <CreateCheckTask :dialog-visible.sync="taskDialog" :errors="data.errors" :results="data.results" />
    <!-- 损益明细弹窗 -->
    <el-dialog
      title="损益详情"
      :visible.sync="increaseDecreaseDialog"
      width="60%"
      :before-close="handleClose"
    >
      <Table :thead="thead2" :table-date="increaseDecreaseDate" />
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" round @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SearchCard from '../List/components/SearchCard.vue'
import Table from '../List/components/table.vue'
import { getCheckTaskList, distributeCheckTask, checkTaskComplete, increaseDecrease, createTask, increaseDecreaseInfo } from '@/api/ManageStorage'
import CreateCheckTask from '../List/components/createCheckTask.vue'
export default {
  components: {
    SearchCard,
    Table,
    CreateCheckTask
  },
  data() {
    return {
      config: [
        { prop: 'code', label: '盘点编号', type: '' },
        { prop: 'status', label: '任务状态', type: 'select',
          children: [
            { prop: '1', label: '待分配', value: '1' },
            { prop: '2', label: '待盘点', value: '2' },
            { prop: '3', label: '盘点中', value: '3' },
            { prop: '4', label: '盘点已完成', value: '4' },
            { prop: '5', label: '已生成损益', value: '5' }
          ] },
        { prop: 'type', label: '盘点类型', type: 'select',
          children: [
            { prop: 'SJPD', label: '随机盘点', value: 'SJPD' },
            { prop: 'JHPD', label: '计划盘点', value: 'JHPD' }
          ] }
      ],
      thead: [
        { label: '盘点单号', prop: 'checkCode', slotName: '', filter: '' },
        { label: '任务编号', prop: 'code', slotName: '', filter: '' },
        { label: '任务状态', prop: 'status', slotName: '', filter: true,
          options: [
            { text: '待分配', prop: 1, value: '待分配' },
            { text: '盘点中', prop: 2, value: '盘点中' },
            { text: '盘点已完成', prop: 3, value: '盘点已完成' },
            { text: '已生成损益', prop: 4, value: '已生成损益' },
            { text: '完成盘点', prop: 5, value: '完成盘点' }
          ] },
        { label: '创建时间', prop: 'createTime', slotName: '', filter: '' },
        { label: '计划作业时间', prop: 'planCheckTime', slotName: '', filter: '' },
        { label: '货主', prop: 'ownerName', slotName: '', filter: '' },
        { label: '盘点维度', prop: 'dimension', slotName: '', filter: '',
          options: [
            { text: '库位', prop: 'KW', value: '库位' },
            { text: '货品', prop: 'HP', value: '货品' }
          ] },
        { label: '盘点类型', prop: 'type', slotName: '', filter: '',
          options: [
            { text: '随机盘点', value: '随机盘点', prop: 'SJPD' },
            { text: '计划盘点', value: '计划盘点', prop: 'JHPD' }
          ] },
        { label: '仓库', prop: 'warehouseName', slotName: '', filter: '' },
        { label: '库区', prop: 'areaName', slotName: '', filter: '' },
        { label: '库存总数', prop: 'stockTotal', slotName: '', filter: '' },
        { label: '盘点次数', prop: 'checkNum', slotName: '', filter: true,
          options: [
            { value: '一盘', prop: 1, text: '一盘' },
            { value: '复盘', prop: 2, text: '复盘' }
          ] },
        { label: '盘点人', prop: 'personName', slotName: '', filter: '' },
        { label: '盘点总数', prop: 'checkTotal', slotName: '', filter: '' },
        { label: '差异合计', prop: 'differenceNum', slotName: '', filter: '' },
        { label: '创建人', prop: 'createName', slotName: '', filter: '' },
        { label: '操作', prop: '', slotName: 'operation', filter: '' }
      ],
      page: {
        current: 1,
        size: 10
      },
      tableDate: [],
      total: 1,
      dialogVisible: false,
      form: {
        personName: ''
      },
      options: [
        { label: '张文礼', value: '张文礼' },
        { label: '王千一', value: '王千一' },
        { label: '徐文', value: '徐文' },
        { label: '赵文谦', value: '赵文谦' }
      ],
      checkTaskInfo: {},
      checkOkDialog: false,
      checkTaskId: '',
      data: {},
      taskDialog: false,
      increaseDecreaseDialog: false,
      thead2: [
        { label: '损益单号', prop: 'code', slotName: '' },
        { label: '仓库名称', prop: 'warehouseName', slotName: '' },
        { label: '库区名称', prop: 'areaName', slotName: '' },
        { label: '库位名称', prop: 'locationName', slotName: '' },
        { label: '货主名称', prop: 'ownerName', slotName: '' },
        { label: '货品名称', prop: 'goodsName', slotName: '' },
        { label: '损益数量', prop: 'idNum', slotName: '' },
        { label: '损益金额（元）', prop: 'idMoney', slotName: '' },
        { label: '处理时间', prop: 'createTime', slotName: '' },
        { label: '损益单状态', prop: 'status', slotName: '' }
      ],
      increaseDecreaseDate: []
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    editCheck(val) {
      console.log(val)
      this.$router.push(`list-task/details/${val.masterId}&1&1`)
    },
    async search(val) {
      const { data } = await getCheckTaskList({
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
        this.thead[11].options.map(ele => {
          if (ele.prop === item.checkNum) {
            item.checkNum = ele.value
          }
        })
      })
      this.tableDate = data.records
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
    distributeCheckTask(val) {
      this.checkTaskInfo = val.scoped.row
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
      this.checkOkDialog = false
      this.increaseDecreaseDialog = false
    },
    async sureDistribute() {
      await distributeCheckTask({
        id: this.checkTaskInfo.id,
        ...this.form
      })
      this.dialogVisible = false
      this.search()
    },
    // 完成盘点
    checkOk(val) {
      this.checkTaskId = val.scoped.row.id
      this.checkOkDialog = true
    },
    async sureCheck() {
      const { data } = await checkTaskComplete([this.checkTaskId])
      console.log(data)
      this.checkOkDialog = false
      this.$message.error(...data.errors)
    },
    toCheckTaskInfo(val) {
      this.$router.push({
        path: `/manage-storage/list-task/details/${val.masterId}&1&0`
      })
      const index = this.$store.state.app.navArr.length - 1
      this.$store.commit('app/EDIT_NAVBARITEM', { index, title: '查看盘点' })
    },
    // 生成损益单
    async increaseDecrease(val) {
      const { data } = await increaseDecrease([val.id])
      console.log(data)
      this.data = data
      this.taskDialog = true
    },
    async increaseDecreases() {
      if (!this.$refs.table.multipleSelection.length) {
        return this.$message.error('请选择盘点任务')
      }
      const arr = this.$refs.table.multipleSelection.map(ele => {
        return ele.id
      })
      const { data } = await increaseDecrease(arr)
      console.log(data)
      this.data = data
      this.taskDialog = true
      this.$refs.table.$refs.table.clearSelection()
    },
    // 生成复盘
    async createTask(val) {
      const { data } = await createTask([val.id])
      console.log(data)
      this.data = data
      this.taskDialog = true
    },
    async createTasks() {
      if (!this.$refs.table.multipleSelection.length) {
        return this.$message.error('请选择盘点任务')
      }
      const arr = this.$refs.table.multipleSelection.map(ele => {
        return ele.id
      })
      const { data } = await createTask(arr)
      console.log(data)
      this.data = data
      this.taskDialog = true
      this.$refs.table.$refs.table.clearSelection()
    },
    // 损益详情
    async increaseDecreaseInfo(val) {
      this.increaseDecreaseDialog = true
      const { data } = await increaseDecreaseInfo({
        current: 1,
        size: 10,
        taskCode: val.code
      })
      console.log(data)
      this.increaseDecreaseDate = data.records
    }
  }
}
</script>

<style lang='scss'>
.cell {
  .el-button {
    padding: 0;
    border: none;
    color: #ffb200;
  }
}
</style>
