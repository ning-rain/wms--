<template>
  <div>
    <!-- 搜索框 -->
    <SearchCard
      :config="config"
      @getFormData="getFormData"
      @resetlist="getTransferList"
    />
    <!-- 表单 -->
    <Table
      :thead="thead"
      :table-date="list"
      :page-sizes="pageSizes"
      :total="total"
      @changeSize="changeSize"
      @changePage="changePage"
    >
      <template #status="{ scoped:{ row }}">
        {{ formateText(row.status) }}
      </template>
      <template #done="{ scoped:{ row }}">
        <el-button v-if="row.handoverName === null" type="text" style="color:#FFB200" @click="setRole(row.id)">分配</el-button>
      </template>
    </Table>
    <el-dialog
      title="人员分配"
      :visible.sync="dialogVisibleFp"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <el-row type="flex" align="middle" justify="center">
          <span class="fuzeren">负责人 </span>
          <el-select v-model="handoverName" clearable placeholder="请选择">
            <el-option
              v-for="item,index in managerList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button round class="reset-btn" @click="handleClose">取 消</el-button>
        <el-button type="primary" class="search-btn" round @click="submitHandoverName">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTransferList, setRole } from '@/api/storageOut'

export default {
  data() {
    return {
      search: {
        code: '',
        outboundCode: '',
        carrierName: '',
        size: 10,
        current: 1
      },
      config: [
        { label: '交接编号', prop: 'code' },
        { label: '出库单号', prop: 'outboundCode' },
        { label: '承运商', prop: 'carrierName'
        }
      ],
      thead: [
        {
          label: '交接编号',
          prop: 'code'
        },
        {
          label: '出库单号',
          prop: 'outboundCode'
        },
        {
          label: '创建时间',
          prop: 'createTime',
          width: '160',
          sortable: true
        },
        {
          label: '创建人',
          prop: 'createName'
        },
        {
          label: '承运商',
          prop: 'carrierName'
        },
        {
          label: '运单号',
          prop: 'billCode'
        },
        {
          label: '交接状态',
          prop: 'status',
          slotName: 'status',
          filters: [
            { 'text': '新建', 'value': '1' },
            { 'text': '交接中', 'value': '2' },
            { 'text': '交接完成', 'value': '3' }
          ],
          filterMethod: this.filterHandler
        },
        {
          label: '交接员',
          prop: 'handoverName'
        },
        {
          label: '交接完成时间',
          prop: 'completionTime',
          width: '160',
          sortable: true
        },
        {
          label: '交接司机',
          prop: 'billCode'
        },
        {
          label: '交接司机电话',
          prop: 'driverPhone'
        },
        {
          label: '操作',
          fixed: 'right',
          width: '200',
          slotName: 'done'
        }
      ],
      list: [],
      total: 0,
      pageSizes: [10, 20, 30, 40],
      dialogVisibleFp: false,
      currentId: '',
      managerList: [
        { label: '张文礼', value: '张文礼' },
        { label: '徐文', value: '徐文' },
        { label: '王千一', value: '王千一' },
        { label: '赵文谦', value: '赵文谦' }],
      handoverName: ''
    }
  },
  created() {
    this.getTransferList(this.search)
  },
  methods: {
    async  getTransferList(obj) {
      try {
        const { data } = await getTransferList(obj)
        // console.log(data)
        this.list = data.records
        this.total = Number(data.total)
      } catch (e) {
        console.log(e)
      }
    },
    changeSize(val) {
      // console.log(val)
      this.search.size = val
      this.getTransferList(this.search)
    },
    formateText(val) {
      if (val === 1) {
        return '新建'
      }
      if (val === 2) {
        return '交接'
      }
      if (val === 3) {
        return '交接完成'
      }
    },
    changePage(val) {
      // console.log(val)
      this.search.current = val
      this.getTransferList(this.search)
    },
    getFormData(obj) {
      // console.log(obj)
      this.getTransferList(obj)
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === Number(value)
    },
    setRole(id) {
      this.currentId = id
      this.dialogVisibleFp = true
    },
    handleClose() {
      this.handoverName = ''
      this.dialogVisibleFp = false
    },
    async submitHandoverName() {
      if (this.handoverName === '') {
        return this.$message.error('请选择')
      }
      const res = await setRole({ handoverName: this.handoverName, id: this.currentId })
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog-footer {
  .el-button {
      color: #332929;
      border: unset;
      background-color: #f8f5f5;

      &.search-btn {
        background-color: #ffb200;
      }
    }
}
.fuzeren {
  margin-right: 15px;
}
</style>
