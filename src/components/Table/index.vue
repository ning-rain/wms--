<template>
  <el-card class="table-card">
    <el-row style="padding: 0px 30px 20px">
      <slot name="btn" />
    </el-row>
    <el-table
      ref="table"
      :data="tableDate"
      style="width: 100%"
      class="mq-table"
      border
      :row-class-name="tableRowClassName"
      :header-cell-style="{ background: 'rgb(249,246,238)' }"
      empty-text="暂无数据"
      @select="changeBoxSelect"
      @select-all="changeAllSelect"
    >
      <!-- @selection-change="handleSelectionChange" -->
      <el-table-column
        v-if="showBox"
        type="selection"
        width="55"
      />
      <el-table-column v-if="isShowIndex" type="index" label="序号" width="80" />
      <template v-for="(item, index) in thead">
        <el-table-column
          v-if="item.slotName"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :fixed="item.fixed || false"
          :width="item.width ||120"
          :sortable="item.sortable||false"
          :filters="item.filters"
          :filter-method="item.filterMethod"
        >
          <!-- :fixed="thead.length == index ? 'right' : 'false'" -->
          <template v-slot="row">
            <slot :name="item.slotName" :scoped="row" />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :fixed="item.fixed || false"
          :width="item.width"
          :sortable="item.sortable||false"
          :filters="item.filters"
          :filter-method="item.filterMethod"
        />
      </template>
    </el-table>
    <div v-if="tableDate.length !== 0 && isShowPage" class="page">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Table',
  props: {
    thead: {
      type: Array,
      default: () => []
    },
    tableDate: {
      type: Array,
      default: () => []
    },
    totalCount: {
      type: [String, Number],
      default: 0
    },
    currentPage: {
      type: [String, Number],
      default: 1
    },
    total: {
      type: [Number, String],
      default: 1
    },
    isShowPage: {
      type: Boolean,
      default: true
    },
    isShowIndex: {
      type: Boolean,
      default: true
    },
    showBox: {
      type: Boolean,
      default: false
    },
    isChecked: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default: () => [1, 5, 10, 15]
    },
    pageSize: {
      type: [Number, String],
      default: 10
    }
  },
  data() {
    return {}
  },
  watch: {
    isChecked(val) {
      if (!val) {
        this.$refs.table.clearSelection()
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(123)
      this.$emit('changeSize', val)
    },
    handleCurrentChange(val) {
      this.$emit('changePage', val)
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'row'
      }
      return ''
    },
    changeBoxSelect(row) { // 单选框
      this.$emit('changeSelect', row)
    },
    changeAllSelect(selection) { // 复选框
      this.$emit('changeallSelect', selection)
    }
  }
}
</script>

<style scoped lang="scss">
.table-card {
  margin-top: 20px;
  border-radius: 12px;
  ::v-deep.el-card__body {
    padding: 20px 0;
  }
  /* padding: 20px 0; */
  ::v-deep.el-table .row {
    background: rgb(253, 252, 249);
  }

  .page {
    display: flex;
    padding: 20px;
    justify-content: center;
    align-items: center;
    span {
      font-size: 16px !important;
      color: #dbdfe5 !important;
    }
    .el-button {
      background-color: #d5ddf8;
    }
  }
}
</style>
