<template>
  <div>
    <SearchCard :config="config" @getFormData="getGoods" @resetlist="getGoods" />
    <Table v-loading="loading" :thead="thead" :table-date="tableDate" :current-page="search.current" :total="total" :page-size="search.size" @changeSize="changeSize" @changePage="changePage">
      <el-button slot="btn" class="btn" @click="$router.push(`/manage-base-info/warehouse/detailss/${null}`)">新增货品</el-button>
      <template v-slot:operation="{scoped:{row}}" class="operation">
        <span class="edit" @click="$router.push(`/manage-base-info/warehouse/detailss/${row.id}`)">编辑</span>
        <span class="del" @click="del(row.id)">删除</span>
      </template>
    </Table>
  </div>
</template>

<script>
import SearchCard from '@/components/SearchCard'
import Table from '@/components/Table'
import { getGoods, delGoods } from '@/api/goodsManagement'
export default {
  components: { SearchCard, Table },
  data() {
    return {
      config: [
        {
          prop: 'code',
          label: '货品编号'
        },
        {
          prop: 'name',
          label: '货品名称'
        },
        {
          prop: 'ownerName',
          label: '货主名称'
        }
      ],
      thead: [
        {
          prop: 'goodsTypeName',
          label: '货品类型名称'
        },
        {
          prop: 'code',
          label: '货品编号'
        },
        {
          prop: 'barCode',
          label: '货品条码'
        },
        {
          prop: 'name',
          label: '货品名称'
        },
        {
          prop: 'ownerName',
          label: '货主名称'
        },
        {
          prop: 'inspectionType',
          label: '质检方式'
        },
        {
          prop: 'temperatureType',
          label: '温度要求'
        },
        {
          prop: 'bearingType',
          label: '承重要求'
        },
        {
          prop: 'areaName',
          label: '指定库区'
        },
        {
          prop: 'volume',
          label: '体积 m3'
        },
        {
          prop: 'price',
          label: '单价(元)'
        },
        {
          prop: 'unit',
          label: '单位'
        },
        {
          prop: 'guaranteeDay',
          label: '保质天数(天)'
        },
        {
          prop: 'updateTime',
          label: '更新时间'
        },
        {
          prop: 'operation',
          label: '操作',
          slotName: 'operation',
          fixed: 'right',
          width: '200'
        }
      ],
      search: {
        id: '',
        code: '',
        name: '',
        ownerName: '',
        size: 10,
        current: 1
      },
      tableDate: [],
      loading: false,
      inspectionType: [],
      // ownerId: this.tableDate.ownerId
      total: 0
    }
  },
  created() {
    this.getGoods(this.search)
  },
  methods: {
    async getGoods(form) {
      try {
        this.loading = true
        const { data } = await getGoods(form)
        console.log(data)
        this.tableDate = data.records.map(item => {
          const name = {
            BCL: '不处理',
            QJ: '全检',
            CJ: '抽检',
            CW: '常温',
            LC: '冷藏',
            HW: '恒温',
            ZX: '重型',
            QX: '轻型',
            BX: '中型'
          }
          item.inspectionType = name[item.inspectionType]
          item.temperatureType = name[item.temperatureType]
          item.bearingType = name[item.bearingType]

          return item
        })
        this.total = +data.total
        this.pageSize = data.size
        // this.inspectionType = data.records.inspectionType
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    async del(id) {
      try {
        await this.$confirm('是否确认删除该货品?', '提示', {
          // confirmButtonText: '确定',
          // cancelButtonText: '取消',
          type: 'warning'
        })
        await delGoods({ 'ids[]': id })
        this.$message.success('货品删除成功!')
        this.getGoods(this.search)
      } catch (e) {
        console.log(e)
      }
    },
    changeSize(val) {
      this.search.size = val
      this.getGoods(this.search)
    },
    changePage(val) {
      this.search.current = val
      this.getGoods(this.search)
    }
  }
}
</script>

<style scoped lang="scss">
.edit {
  color: #ffb200;
      font-size: 13px;
      margin-right:30px;
      cursor: pointer;
}
.del {
    color: #ffb200;
      font-size: 13px;
      cursor: pointer;
}

.btn {
      background: #00be76;
    color: #fff;
        border-radius: 20px;
}

::v-deep .operation {
  text-align: center;
}
</style>
