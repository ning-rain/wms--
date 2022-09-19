<template>
  <div>
    <SearchCard
      :config="setForm"
      @getFormData="searchData"
      @reset="getwarehouseList"
    />
    <Table
      :thead="tableLabel"
      :table-date="tableData"
      :total="total"
      @changeSize="changeSize"
      @changePage="changePage"
    >
      <template #btn>
        <el-button round @click="getCode">新增仓库</el-button>
      </template>
      <template #operate="{ scoped: { row } }">
        <span class="operate-btn" @click="editWareHouse(row)">编辑</span>
        <span class="operate-btn" @click="editWareHouseStatus(row)">{{
          row.status ? "停用" : "启用"
        }}</span>
        <span class="operate-btn" @click="delWareHouse(row)">删除</span>
      </template>
      <template #type="{ scoped: { row } }">{{
        formateText(row.type)
      }}</template>
      <template #status="{ scoped: { row } }">{{
        row.status ? "启用" : "停用"
      }}</template>
    </Table>
  </div>
</template>

<script>
import {
  getwarehouseList,
  editWareHouse,
  delWareHouse
} from '@/api/manageBaseInfo'

export default {
  data() {
    return {
      tableLabel: [
        {
          prop: 'code',
          label: '仓库编码'
        },
        {
          prop: 'name',
          label: '仓库名称'
        },
        {
          prop: 'type',
          label: '仓库类型',
          slotName: 'type'
        },
        {
          prop: 'location',
          label: '省/市/区',
          width: '160'
        },
        {
          prop: 'address',
          label: '详细地址'
        },
        {
          prop: 'status',
          label: '仓库状态',
          slotName: 'status'
        },
        {
          prop: 'surface',
          label: '仓库面积²'
        },
        {
          prop: 'includedNum',
          label: '库区数量'
        },
        {
          prop: 'personName',
          label: '负责人'
        },
        {
          prop: 'phone',
          label: '联系电话',
          width: '130'
        },
        {
          prop: 'updateTime',
          label: '更新时间',
          width: '150'
        },
        {
          label: '操作',
          slotName: 'operate',
          fixed: 'right',
          width: '150'
        }
      ],
      tableData: [],
      total: '',
      currentPage: '',
      pageSize: '',
      setForm: [
        { label: '仓库编号', prop: 'like_code' },
        { label: '仓库名称', prop: 'like_name' },
        {
          label: '仓库状态',
          prop: 'status',
          type: 'select',
          children: [
            { label: '全部', value: null },
            { label: '停用', value: 0 },
            { label: '启用', value: 1 }
          ]
        }
      ]
    }
  },
  created() {
    this.getwarehouseList()
    // this.getCode();
  },
  methods: {
    async getwarehouseList(current = 1, size = 10, form) {
      const { data } = await getwarehouseList({ current, size, ...form })
      // console.log(data);
      this.tableData = data.records
      this.total = parseInt(data.total)
      this.pageSize = data.size
      // console.log(res);
    },
    formateText(type) {
      if (type == 'ZZ') {
        return '中转仓'
      } else if (type == 'JG') {
        return '加工仓'
      } else if (type == 'CB') {
        return '储备仓'
      } else if (type == 'LC') {
        return '冷藏仓'
      }
    },
    changeSize(val) {
      this.pageSize = val
      this.getwarehouseList(1, val)
    },
    changePage(val) {
      this.getwarehouseList(val, this.pageSize)
    },
    searchData(form) {
      this.getwarehouseList(1, 10, form)
    },
    getCode() {
      // console.log(res);
      this.$router.push('/manage-base-info/warehouse/details/null')
    },
    editWareHouse(row) {
      this.$store.commit('manageBaseInfo/SET_DETAILS', row)
      this.$router.push(`/manage-base-info/warehouse/details/${row.id}`)
      const index = this.$store.state.app.navArr.length - 1
      this.$store.commit('app/EDIT_NAVBARITEM', { index, title: '修改仓库' })
      // console.log(row);
    },
    editWareHouseStatus(row) {
      this.$confirm(
        `确定要${row.status ? '停用' : '启用'}：${row.name} 吗？`,
        `确认${row.status ? '停用' : '启用'}`,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(async() => {
          const status = row.status ? '0' : '1'
          await editWareHouse({ id: row.id, status })
          this.getwarehouseList()
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
    },
    async delWareHouse(row) {
      this.$confirm(`确定要删除：${row.name} 吗？`, `确定删除`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await delWareHouse({ ids: [row.id] })
          this.getwarehouseList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style>
.operate-btn {
  font-size: 13px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #ffb200;
  cursor: pointer;
  border-color: transparent;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
  outline: 0;
  margin-left: 8px;
  margin-right: 8px;
}
</style>
