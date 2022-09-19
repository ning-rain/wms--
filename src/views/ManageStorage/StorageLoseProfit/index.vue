<template>
  <div>
    <SearchCard class="card" :config="configArray" @getFormData="searchByMsg" @reset="reset" />
    <Table :thead="thead" :table-date="tableDate">
      <template v-slot:btn>
        <div class="profit">
          <p>合计  <span>{{ total.totalNum }}个</span> <span>{{ total.totalMoney }}元</span></p>
        </div>
      </template>
    </Table>
  </div>
</template>

<script>
import { getLoseProfile } from '@/api/manageBaseInfo'
export default {
  data() {
    return {
      configArray: [{ label: '损益单号', prop: 'code' },
        { label: '损益单状态', prop: 'status', type: 'select', children: [{ label: '新建', value: '1', prop: '1' }, { label: '已调整', value: '2', prop: '2' }] },
        { label: '货主名称', prop: 'ownerName' },
        { label: '货品名称', prop: 'goodsName' }
      ],
      thead: [
        { label: '损益效果', prop: 'code', width: '120' },
        { label: '仓库名称', prop: 'warehouseName' },
        { label: '库区名称', prop: 'areaName' },
        { label: '库位名字', prop: 'locationName' },
        { label: '货主名称', prop: 'ownerName', sortable: true, width: '120' },
        { label: '货品名称', prop: 'goodsName', sortable: true, width: '120' },
        { label: '损益数量', prop: 'idNum' },
        { label: '损益金额(元)', prop: 'idMoney', sortable: true, width: '140' },
        { label: '创建人', prop: 'createName' },
        { label: '创建时间', prop: 'createTime', sortable: true, width: '200' },
        {
          label: '损益来源', prop: 'idSource', width: '120', filters: [{ 'text': '盘点', 'value': '盘点' }, { 'text': '上架', 'value': '上架' }, { 'text': '拣货', 'value': '拣货' }],
          filterMethod: (value, row, column) => {
            const property = column['property']
            return row[property] === value
          }
        },
        { label: '处理人', prop: 'updateName' },
        { label: '处理时间', prop: 'updateTime', sortable: true, width: '200' },
        { label: '操作', prop: 'done', slotName: 'done', fixed: 'right', width: '200' }
      ],
      form: {
        code: '',
        ownerName: '',
        goodsName: '',
        size: '10',
        current: '1'
      },
      tableDate: [],
      total: {
        totalNum: 0,
        totalMoney: 0
      }
    }
  },
  mounted() {
    this.getDate(this.form)
  },
  methods: {
    async getDate(form) {
      const res = await getLoseProfile(form)
      this.tableDate = res.data.records
      this.tableDate.reduce((item, pre) => {
        this.total.totalNum += Number(pre.idNum)
        this.total.totalMoney += Number(pre.idMoney)
      }, this.total)
      this.tableDate = this.tableDate.map(item => {
        const obj = {
          'PD': '盘点',
          'SJ': '上架',
          'JH': '拣货'
        }
        item.idSource = obj[item.idSource]
        return item
      })
    },
    searchByMsg(form) {
      this.form = { ...this.form, ...form }
      this.getDate(this.form)
    },
    reset() {
      this.form = {
        code: '',
        ownerName: '',
        goodsName: '',
        size: '10',
        current: '1'
      }
      this.getDate(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card{
    height: 215px;
  }
  ::v-deep .box-card .card-form .el-col .el-form-item{
      margin-bottom: 22px;
    }
  ::v-deep .el-select{
    width: 100%;
  }
  .profit{
    // margin: 0 0 20px 20px;
    background: #fff9eb;
    border: 1px solid #ffb200;
    height: 32px;
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    line-height: 32px;
    padding:0 9px;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    p{
      margin:0
    }
    span{
      color: #ffb200;
    }
    }
</style>
