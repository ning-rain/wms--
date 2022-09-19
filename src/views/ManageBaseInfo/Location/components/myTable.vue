<template>
  <div>
    <el-table
      ref="table"
      v-loading="loading"
      :data="tableList"
      style="width: 100%"
      border
      :header-cell-style="{ background: 'rgb(249,246,238)' }"
      empty-text="暂无数据"
      stripe
    >
      <el-table-column type="index" width="80" align="center" />
      <el-table-column prop="warehouseName" label="所属仓库" align="center" />
      <el-table-column prop="areaCode" label="库区编码" width="100px" align="center" />
      <el-table-column prop="areaName" label="库区名称" width="160px" align="center" />
      <el-table-column prop="code" label="库位编码" width="100px" align="center" />
      <el-table-column prop="name" label="库位名称" align="center" />
      <el-table-column label="温度类型" align="center">
        <template slot-scope="{row}">
          {{ row.temperatureType|temperatureType }}
        </template>
      </el-table-column>
      <el-table-column label="承重类型" align="center">
        <template slot-scope="{row}">
          {{ row.bearingType|bearingType }}
        </template>
      </el-table-column>
      <el-table-column label="用途属性" width="150px" align="center">
        <template slot-scope="{row}">
          {{ row.useType|useType }}
        </template>
      </el-table-column>
      <el-table-column label="停用状态" align="center">
        <template slot-scope="{row}">
          {{ row.status|status }}
        </template>
      </el-table-column>
      <el-table-column prop="maxNum" label="承载上限" align="center" />
      <el-table-column prop="updateTime" label="更新时间" width="200px" align="center" />
      <el-table-column label="操作" fixed="right" width="160px" align="center">
        <template slot-scope="{row}">
          <el-button type="text" class="textBtnColor" @click="editLoction(row)">编辑</el-button>
          <el-button type="text" class="textBtnColor" @click="changeStatus(row)">
            {{ row.status==1?'停用':'启用' }}
          </el-button>
          <el-button type="text" class="textBtnColor" @click="delLocation(row)">删除</el-button>
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
  </div>
</template>

<script>
import { putLocation, deleteLocation } from '@/api/manageBaseInfo'
export default {
  name: 'MyTable',
  filters: {
    temperatureType(val) {
      const type = {
        CW: '常温',
        LC: '冷藏',
        HW: '恒温'
      }
      return type[val]
    },
    bearingType(val) {
      const type = {
        ZX: '重型',
        QX: '轻型',
        BX: '中型'
      }
      return type[val]
    },
    useType(val) {
      const type = {
        RKHCQ: '入库缓存区',
        CKHCQ: '出库缓存区',
        CCQ: '存储区',
        FJQ: '分拣区',
        ZJQ: '质检区'
      }
      return type[val]
    },
    status(val) {
      const type = {
        0: '停用',
        1: '启用'
      }
      return type[val]
    }

  },

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
    changeStatus(row) {
      const status = row.status == 1 ? 0 : 1
      const statusNmae = row.status == 1 ? '停用' : '启用'
      const data = {
        id: row.id,
        status
      }
      this.$confirm(`确定要${statusNmae}:${row.name}吗?`, `确定${statusNmae}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await putLocation(data)
        this.$emit('refresh')
        this.$message.success('状态改变成功')
      }).catch(() => {

      })
    },
    editLoction(row) {
      this.$router.push(`/manage-base-info/location/detail/${row.id}`)
    },
    async delLocation(row) {
      const res = await deleteLocation({ 'ids[]': row.id })
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="scss" scoped>
    .textBtnColor{
        &.el-button--text{
            color: #ffb200;
        }
    }
    .el-table__row--striped{
        td{
            background: #fdfcf9!important;
        }
    }
    .pagination{
        margin-top: 20px;
    }
</style>
