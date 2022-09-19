<template>
  <div class="taskDtail">
    <Table :thead="thead" :table-date="list" :page-sizes="pageSizes" :total="total"></Table>
    <div class="buttonBox">
      <el-button
        round
        style="width:100px;background-color:#f8f5f5;width:180px;margin-right:20px;color:black;"
        class="importantButton"
        @click="returnFn"
      >返回</el-button>
    </div>
  </div>
</template>

<script>
import { getPagingList } from '@/api/ListInList'
export default {
  name: 'TaskReceiveIn',
  data() {
    return {
      thead: [
        { label: '货主名称', prop: 'ownerName' },
        { label: '货品编号', prop: 'goodsCode' },
        { label: '货品名称', prop: 'goodsName' },
        { label: '货品类型', prop: 'goodsTypeName' },
        { label: '货品单价(元)', prop: 'goodsPrice' },
        { label: '保质天数(天)', prop: 'goodsGuaranteeDay' },
        { label: '单位', prop: 'goodsUnit' },
        { label: '体积(m3)', prop: 'goodsVolume' },
        { label: '到货数量', prop: 'planNum' },
        { label: '实收总数', prop: 'realNum' },
        { label: '收获差异', prop: 'realDifferenceNum' },
      ],
      list: [],
      pageSizes: [10, 20, 30, 40],
      total: 0,
      id: this.$route.params.id,
      page: {
        masterId: this.$route.params.id,
        current: 1,
        size: 10,
      },
    }
  },
  created() {
    this.getPagingList()
  },
  methods: {
    async getPagingList() {
      try {
        console.log('minanyi', this.page)
        const { data } = await getPagingList(this.page)
        console.log(data)
        this.list = data.records
        this.total = data.total * 1
      } catch (error) {
        console.log(error)
      }
    },
    // 返回按钮
    returnFn() {
      this.$router.back()
    },
  },
}
</script>

<style lang="scss" scoped>
.taskDtail {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
  min-height: 400px;
  .progress {
    padding: 32px 0 40px 20px;
    height: 72px;
  }
}
.importantButton {
  margin-top: 20px;
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
