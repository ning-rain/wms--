<template>
  <div>
    <SearchCard ref="searchCard" :config="config" @changeValue="changeValue" @getFormData="getFormData" />
    <el-card class="el-card">
      <myTable
        :table-list="tableList"
        :current="searchTerm.current"
        :total="total"
        :size="searchTerm.size"
        :loading="loading"
        @changeSize="changeSize"
        @changePage="changePage"
      />
    </el-card>
  </div>
</template>

<script>
import SearchCard from '@/components/SearchCard'
import myTable from './components/myTable.vue'
import { warehouseList, getAreaList, getLocationlist, getStockPageDetail } from '@/api/ManageStorage'
export default {
  name: 'LatestStorage',
  components: { SearchCard, myTable },
  data() {
    return {
      searchTerm: {
        // warehouseId: '',
        // areaId: '',
        // locationId: '',
        ownerName: '',
        goodsName: '',
        current: 1,
        size: 10,
        descs: 'createTime'

      },
      config: [
        {
          prop: 'warehouseId', label: '仓库', type: 'select',
          children: []
        },
        {
          prop: 'areaId', label: '库区', type: 'select',
          children: []
        },
        {
          prop: 'locationId', label: '库位', type: 'select',
          children: []
        },
        {
          prop: 'ownerName',
          label: '货主名称',
          type: ''
        },
        {
          prop: 'goodsName',
          label: '货品名称',
          type: ''
        }
      ],
      tableList: [],
      total: 0,
      loading: false
    }
  },
  created() {
    this._warehouseList()
    this._getStockPageDetail()
  },
  methods: {
    // 仓库条件
    async _warehouseList() {
      const { data } = await warehouseList({ status: 1 })
      this._formatChildren(data, 0)
    },
    // 根据条件不同显示不同级联选择器
    async changeValue($event, prop) {
      if (prop === 'warehouseId') {
        const { data } = await getAreaList({ status: 1, warehouseId: $event })
        this._formatChildren(data, 1)
      } else {
        const { data } = await getLocationlist({ status: 1, areaId: $event })
        this._formatChildren(data, 2)
      }
    },
    _formatChildren(data, index) {
      const children = data.map((item) => {
        return { value: item.id, label: item.name }
      })
      this.config[index].children = children
    },
    getFormData(form) {
      Object.assign(this.searchTerm, form)
      console.log('this.searchTerm', this.searchTerm)
      this._getStockPageDetail()
    },
    // 列表接口
    async  _getStockPageDetail() {
      this.loading = true
      const { data } = await getStockPageDetail(this.searchTerm)
      console.log('data', data)
      this.tableList = data.records
      this.total = +data.total
      this.current = data.current
      this.loading = false
    },
    // 重置
    getwarehouseList() {
      this.searchTerm = {
        ownerName: '',
        goodsName: '',
        current: 1,
        size: 10,
        descs: 'createTime'
      }
      this._getStockPageDetail()
    },
    changeSize(val) {
      this.$set(this.searchTerm, 'size', val)
      this._getStockPageDetail()
    },
    changePage(val) {
      this.$set(this.searchTerm, 'current', val)
      console.log(77777777, val)
      this._getStockPageDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card{
  margin-top: 20px;
}
</style>
