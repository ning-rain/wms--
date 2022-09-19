<template>
  <div>
    <Table :thead="thead" :page-sizes="pageSizes" :table-date="list" :total="total" @changeSize="changeSize" @changePage="changePage">
      <template slot="btn">
        <div class="infoTip">
          计划数量：
          <span>{{ sumList.goodsTotal }}</span>
          实拣：
          <span>{{ sumList.pickingTotal }}</span>
        </div>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from '@/components/Table/index.vue'
import { searchSum, getOutBound } from '@/api/storageOut'
export default {
  components: { Table },
  data() {
    return {
      sumList: [],
      //   size: 10,
      //   current: 1,
      list: [],
      thead: [
        {
          label: '货品编码',
          prop: 'goodsCode'
        },
        {
          label: '货品条码',
          prop: 'goodsBarCode'
        },
        {
          label: '货品名称',
          prop: 'goodsName',
          width: '160'
        },
        {
          label: '货品类型',
          prop: 'goodsTypeName'
        },
        {
          label: '库区',
          prop: 'areaName'
        },
        {
          label: '库位',
          prop: 'locationName',
          width: '160'
        },
        {
          label: '拣货数量',
          prop: 'pickingNum'
        },
        {
          label: '实拣数量',
          prop: 'pickingNum'
        },
        {
          label: '差异数',
          prop: 'differenceNum'
        }
      ],
      total: 0,
      pageSizes: [10, 20, 30, 40],
      size: ''

    }
  },
  created() {
    console.log(this.$route.params.id)
    this.searchSum()
    this.getOutBound(this.outBound)
  },
  methods: {
    async  searchSum() {
      try {
        const { data } = await searchSum(this.$route.params.id)
        // console.log(data)
        this.sumList = data
      } catch (e) {
        console.log(e)
      }
    },
    async getOutBound(current = 1, size = 10) {
      try {
        const { data } = await getOutBound({ current, size, masterId: this.$route.params.id })
        this.list = data.records
        this.total = data.total - 0
        // this.size = data.size
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    },
    changeSize(val) {
    //   console.log(val)
      this.size = val
      this.getOutBound(1, val)
    },
    changePage(val) {
    //   console.log(val
      this.getOutBound(val, this.size)
    }
  }
}
</script>

<style lang="scss" scoped>
.infoTip {
    display: inline-block;
    height: 32px;
    line-height: 30px;
    background: #fff9eb;
    border: 1px solid #ffb200;
    padding: 0 25px;
    font-size: 14px;

    span {
       color: #ffb200;;
    }
}
</style>
