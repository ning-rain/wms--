<template>
  <div class="warehousing">
    <SearchCard :config="configTitle" @getFormData="getFormDataFn" @resetlist="resetlistFn"></SearchCard>
    <Table
      :thead="thead"
      :showBox="showBoxB"
      :table-date="list"
      :page-sizes="pageSizes"
      :total="total"
      @changeSize="changeSize"
      @changePage="changePage"
    >
      <template slot="btn">
        <el-button
          round
          style="background-color:#55bb7c;color:white;"
          class="importantButton"
          @click="addXz"
        >新增入库单</el-button>
        <el-button
          round
          style="background-color:#f7f5f5;color:black;"
          class="unimportanceButton"
        >生成收货任务</el-button>
      </template>
      <template #status="{ scoped:{ row }}">{{ formateText(row.status) }}</template>
      <template v-slot:action="{ scoped:{ row } }">
        <el-button
          type="text"
          @click="vewDetails(row)"
          style="color:#f7c76d;"
          class="viewDetails"
        >查看详情</el-button>
      </template>
    </Table>
  </div>
</template>

<script>
import { getInquire } from '@/api/ListInList'
export default {
  data() {
    return {
      configTitle: [
        { label: '入库单号', prop: 'code' },
        { label: '运单编号', prop: 'billCode' },
        { label: '货主名称', prop: 'ownerName' },
      ],
      thead: [
        { label: '入库单号', prop: 'code' },
        { label: '运营编号', prop: 'billCode' },
        { label: '计划到达时间', prop: 'planArrivalTime' },
        { label: '货主编号', prop: 'ownerCode', sortable: true },
        { label: '货主名称', prop: 'ownerName', sortable: true },
        { label: '仓库名称', prop: 'warehouseName' },
        { label: '车牌号', prop: 'license' },
        { label: '送货人名称', prop: 'deliveryName' },
        { label: '送货人电话', prop: 'deliveryPhone' },
        { label: '入库单状态', prop: 'status', slotName: 'status' },
        { label: '预计到达货数', prop: 'planNum' },
        { label: '创建人', prop: 'createName' },
        { label: '创建时间', prop: 'createTime' },
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
        billCode: '',
        ownerName: '',
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
    this.getInquire()
  },
  methods: {
    async getInquire() {
      try {
        const { data } = await getInquire()
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
      const { data } = await getInquire(form)
      // console.log(data)
      this.list = data.records
    },
    // 重置
    resetlistFn(form) {
      this.getInquire()
      form = {}
    },
    changeSize(val) {
      // console.log(val)
      this.search.size = val
      this.getInquire()
    },
    changePage(val) {
      // console.log(val)
      this.search.current = val
      this.getInquire()
    },
    // 查看详情
    vewDetails(row) {
      this.$router.push({
        path: `/manage-storage-in/list-in/list/list-detail/${row.id}`,
        query: row,
      })
    },
    // 新增
    addXz() {
      this.$router.push({
        path: `/manage-storage-in/list-in/list/details/${null}`,
      })
    },
  },
}
</script>

<style lang="scss">
.warehousing {
  .importantButton:hover {
    background-color: #347850 !important;
  }
  .unimportanceButton:hover {
    background-color: #f4b53f !important;
  }
  .viewDetails:hover {
    color: #f5bc50 !important;
  }
}
</style>

