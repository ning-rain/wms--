<template>
  <div>
    <el-table
      v-loading="loading"
      :data="bookList"
      :header-cell-style="{ background: 'rgb(249,246,238)' }"
      empty-text="暂无数据"
      style="width: 100%"
      stripe
    >
      <el-table-column
        type="index"
        width="50"
        label="序号"
        align="center"
      />
      <el-table-column
        prop="type"
        label="任务类型"
        width="150px"
        align="center"
      >
        <template slot-scope="{row}">
          {{ row.type|type }}
        </template>
      </el-table-column>
      <el-table-column
        prop="original"
        label="原始总库存"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="originalFree"
        label="原始可用库存"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="way"
        label="变动方式"
        width="150px"
        align="center"
      >
        <template slot-scope="{row}">
          {{ row.way|way }}
        </template>
      </el-table-column>
      <el-table-column
        prop="alteration"
        label="操作库存"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="result"
        label="操作后总库存"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="resultFree"
        label="操作后可用库存"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="resultFree"
        label="操作后可用库存"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="locationName"
        label="库位名称"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="createName"
        label="更新人员"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="createTime"
        label="更新时间"
        width="150px"
        align="center"
      />
    </el-table>
    <el-row type="flex" justify="center" class="pagination">
      <el-pagination
        :current-page="current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </div>
</template>

<script>
export default {
  filters: {
    type(val) {
      const name = {
        SY: '损益',
        CK: '出库',
        PD: '盘点',
        JH: '拣货',
        RK: '上架'
      }
      return name[val]
    },
    way(val) {
      const name = {
        '-': '-',
        '+': '+',
        'frozen': '冻结',
        'unfreeze': '解冻'
      }
      return name[val]
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    bookList: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 当前页码
    current: {
      type: [String, Number],
      default: function() {
        return 1
      }
    },
    total: {
      type: [String, Number],
      default: function() {
        return 0
      }
    },
    size: {
      type: [String, Number],
      default: function() {
        return 10
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('changeSizechild', val)
    },
    handleCurrentChange(val) {
      let page
      if (val > Math.floor(this.total / this.size)) {
        page = Math.floor(this.total / this.size)
      }
      page = val
      this.$emit('changePageChild', page)
    }
  }
}
</script>

<style lang="scss" scoped>
 .el-table__row--striped{
        td{
            background: #fdfcf9!important;
        }
    }
.el-button--text{
    color: #ffb200;
}
</style>
