<template>
  <div class="warehousing">
    <SearchCard :config="configTitle" @getFormData="getFormDataFn" @resetlist="resetlistFn" />
    <Table
      :thead="thead"
      :show-box="showBoxB"
      :table-date="list"
      :page-sizes="pageSizes"
      :total="total"
      @changeSize="changeSize"
      @changePage="changePage"
    >
      <template slot="btn">
        <el-button round style="background-color:#55bb7c;color:white;" class="importantButton">收货完成</el-button>
      </template>
      <template #status="{ scoped:{ row }}">{{ formateText(row.status) }}</template>
      <template v-slot:action="{ scoped:{ row } }">
        <el-button
          type="text"
          style="color:#f7c76d;"
          class="viewDetails"
          @click="vewDetails(row)"
        >查看详情</el-button>
      </template>
    </Table>
  </div>
</template>

<script>
import { getReceiving } from '@/api/ListInList'
export default {
  data() {
    return {
      configTitle: [
        { label: '任务编号', prop: 'code' },
        { label: '货主名称', prop: 'ownerName' },
        {
          label: '收货状态',
          prop: 'status',
          type: 'select',
          children: [
            { value: '待分配' },
            { value: '收获中' },
            { value: '收货完成' },
            { value: '已取消' },
          ],
        },
      ],
      thead: [
        { label: '收货任务编号', prop: 'code' },
        { label: '入库单号', prop: 'receiptCode' },
        { label: '创建人', prop: 'createName' },
        { label: '创建时间', prop: 'createTime', sortable: true },
        { label: '货主名称', prop: 'ownerName' },
        { label: '仓库名称', prop: 'warehouseName' },
        { label: '库区名称', prop: 'areaName' },
        { label: '预计到货数', prop: 'planNum' },
        {
          label: '收货状态',
          prop: 'status',
          slotName: 'status',
          filters: [
            { text: '待分配', value: '1' },
            { text: '收货中', value: '2' },
            { text: '收货完成', value: '4' },
            { text: '已取消', value: '3' },
          ],
          filterMethod: (value, row, column) => {
            console.log(value, row, column)
            const property = column['property'] // status
            return row[property] === parseInt(value)
          },
        },
        { label: '收货人', prop: 'receiverName' },
        { label: '实收总数', prop: 'realNum' },
        { label: '收货差异', prop: 'differenceNum' },
        { label: '收货完成时间', prop: 'completionTime', sortable: true },
        {
          label: '操作',
          slotName: 'action',
          prop: 'code',
          fixed: 'right',
          width: '200',
        },
      ],
      search: {
        code: '',
        ownerName: '',
        status: '',
        size: 10,
        current: 1,
      },
      showBoxB: true,
      list: [],
      total: 0,
      pageSizes: [10, 20, 30, 40],
    }
  },
  created() {
    this.getReceiving()
  },
  methods: {
    async getReceiving() {
      try {
        const { data } = await getReceiving()
        // console.log(data)
        this.list = data.records
        this.total = data.total * 1
      } catch (error) {
        console.log(error)
      }
    },
    formateText(val) {
      if (val === 1) {
        return '待分配'
      }
      if (val === 2) {
        return '收货中'
      }
      if (val === 3) {
        return '收货完成'
      }
      if (val === 4) {
        return '已取消'
      }
    },
    // 搜索
    async getFormDataFn(form) {
      const { data } = await getReceiving(form)
      console.log('21', data)
      this.list = data.records
    },
    // 重置
    resetlistFn(form) {
      this.getReceiving()
      form = {}
    },
    changeSize(val) {
      // console.log(val)
      this.search.size = val
      this.getReceiving()
    },
    changePage(val) {
      // console.log(val)
      this.search.current = val
      this.getReceiving()
    },
    vewDetails(row) {
      this.$router.push({
        path: `/manage-storage-in/list-in/task-receive/sure/${row.masterId}/detail`,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.warehousing {
  .importantButton:hover {
    background-color: #347850 !important;
  }

  .viewDetails:hover {
    color: #f5bc50 !important;
  }
}
</style>

