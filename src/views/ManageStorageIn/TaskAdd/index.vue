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
import { getGrounding } from '@/api/ListInList'
export default {
  data() {
    return {
      configTitle: [
        { label: '上架编号', prop: 'code' },
        { label: '入库单号', prop: 'receiptCode' },
        { label: '货主名称', prop: 'ownerName' },
      ],
      thead: [
        { label: '上架任务编号', prop: 'code' },
        { label: '入库单号', prop: 'receiptCode' },
        { label: '创建时间', prop: 'createTime', sortable: true },
        { label: '货主名称', prop: 'ownerName' },
        { label: '仓库名称', prop: 'warehouseName' },
        { label: '库区名称', prop: 'areaName' },
        { label: '负责人', prop: 'personName' },
        {
          label: '上架状态',
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
        { label: '货品数量', prop: 'planNum' },
        { label: '实收总数', prop: 'realNum' },
        { label: '上架数量', prop: 'groundingNum' },
        { label: '差异总数', prop: 'differenceNum' },
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
        receiptCode: '',
        ownerName: '',
        size: 10,
        current: 1,
      },
      showBoxB: false,
      list: [],
      total: 0,
      pageSizes: [10, 20, 30, 40],
    }
  },
  created() {
    this.getGrounding()
  },
  methods: {
    async getGrounding() {
      try {
        const { data } = await getGrounding()
        // console.log(data)
        this.list = data.records
        this.total = data.total * 1
      } catch (error) {
        console.log(error)
      }
    },
    formateText(val) {
      if (val === 1) {
        return '新建'
      }
      if (val === 2) {
        return '收货中'
      }
      if (val === 3) {
        return '已取消'
      }
      if (val === 4) {
        return '收货完成'
      }
      if (val === 5) {
        return '上架中'
      }
      if (val === 6) {
        return '上架完成'
      }
    },
    // 搜索
    async getFormDataFn(form) {
      // console.log(form)
      const { data } = await getGrounding(form)
      console.log(data)
      this.list = data.records
    },
    // 重置
    resetlistFn(form) {
      this.getGrounding()
      form = {}
    },
    changeSize(val) {
      // console.log(val)
      this.search.size = val
      this.getGrounding()
    },
    changePage(val) {
      // console.log(val)
      this.search.current = val
      this.getGrounding()
    },
    vewDetails(row) {
      console.log(row.id)
      this.$router.push({
        path: `/manage-storage-in/list-in/task-add/sure/${row.masterId}/detail`,
      })
    },
  },
}
</script>

<style lang="scss">
.warehousing {
  .viewDetails:hover {
    color: #f5bc50 !important;
  }
}
</style>

