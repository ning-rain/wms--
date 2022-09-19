<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableList"
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
        prop="warehouseName"
        label="仓库名称"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="locationCode"
        label="库区编号"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="areaName"
        label="库区名称"
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
        prop="ownerCode"
        label="货主编码"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="ownerName"
        label="货主名称"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="goodsCode"
        label="货品编码"
        width="150px"
        align="center"
        sortable
      />
      <el-table-column
        prop="goodsBarCode"
        label="货品条码"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="goodsName"
        label="货品名称"
        width="150px"
        align="center"
        sortable
      />
      <el-table-column
        prop="goodsUnit"
        label="单位"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="total"
        label="总库存数"
        width="150px"
        align="center"
        fixed="right"
      />
      <el-table-column
        prop="free"
        label="可用库存"
        width="150px"
        align="center"
        fixed="right"
      />
      <el-table-column
        prop="frozen"
        label="冻结库存"
        width="150px"
        align="center"
        fixed="right"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template slot-scope="{row}">
          <el-button
            type="text"
            size="small"
            @click="bookLoction(row)"
          >
            库存日志
          </el-button>
        </template>
      </el-table-column>
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

    <!-- 弹框 -->
    <el-dialog
      title="库存日志"
      :visible.sync="bookVisible"
      width="900px"
    >
      <div>日期</div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-date-picker
            v-model="date"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
            class="cellClassName"
            format="yyyy-MM-dd HH:MM:SS"
            value-format="yyyy-MM-dd HH:MM:SS"
            @change="changeTime"
          />
        </el-col>
        <el-col :span="12" type="flex" justify="end">
          <el-row type="flex" justify="end">
            <el-col :span="12" class="opactity">888</el-col>
            <el-col :span="12" class="btnGroup">
              <el-button round class="search-btn" @click="searchBook">搜索</el-button>
              <el-button round class="reset-btn" @click="resetBook">重置</el-button>
            </el-col>
          </el-row>

        </el-col>
      </el-row>
      <bookTable
        :book-list="bookList"
        :total="bookTotal"
        :current="bookForm.current"
        :size="bookForm.size"
        :loading="childLoading"
        @changeSizechild="changeSizechild"
        @changePageChild="changePageChild"
      />
    </el-dialog>

  </div>
</template>

<script>
import { getStockRecordPage } from '@/api/ManageStorage'
import bookTable from './bookTable.vue'
export default {
  components: { bookTable },
  props: {
    loading: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    tableList: {
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
  data() {
    return {
      bookVisible: false,
      bookForm: {
        locationId: '',
        current: 1,
        size: 10,
        descs: 'updateTime'
      },
      bookList: [],
      bookTotal: 0,
      locationName: '',
      childLoading: false,
      date: '',
      ge_createTime: '',
      le_createTime: ''
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('changeSize', val)
    },
    handleCurrentChange(val) {
      let page
      if (val > Math.floor(this.total / this.size)) {
        page = Math.floor(this.total / this.size)
      }
      page = val
      this.$emit('changePage', page)
    },
    async bookLoction(row) {
      this.$set(this.bookForm, 'locationId', row.locationId)
      this.bookVisible = true
      this._bookList()
      this.locationName = row.locationName
    },
    async _bookList() {
      this.childLoading = true
      const { data } = await getStockRecordPage(this.bookForm)
      this.bookList = data.records.map((item) => {
        item['locationName'] = this.locationName
        return item
      })
      this.bookTotal = +data.total
      this.childLoading = false
    },
    changeSizechild(val) {
      this.$set(this.bookForm, 'size', val)
      this._bookList()
    },
    changePageChild(val) {
      this.$set(this.bookForm, 'current', val)
      this._bookList()
    },
    changeTime(val) {
      this.bookForm = Object.assign(this.bookForm, {
        ge_createTime: val[0],
        le_createTime: val[1]
      })
      console.log('this.bookForm', this.bookForm)
    },
    searchBook() {
      this._bookList()
    },
    resetBook() {
      this.date = ''
      delete this.bookForm.ge_createTime
      delete this.bookForm.le_createTime
      console.log('this.bookForm', this.bookForm)
      this._bookList()
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
::v-deep .cellClassName{
  margin: 20px 0;
}
.opactity{
  opacity: 0;
}
.btnGroup{
  margin-top: 20px;
}
.search-btn{
  background: #ffb200;
  color: #332929;
}
.reset-btn{
  background: #f8f5f5;
  color: #332929;
}
</style>
