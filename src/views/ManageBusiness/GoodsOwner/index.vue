<template>
  <div>
    <SearchCard :config="config" @getFormData="getShipper" @resetlist="getShipper" />
    <Table v-loading="loading" :thead="thead" :table-date="tableDate" :current-page="search.current" :total="total" :page-size="search.size" @changeSize="changeSize" @changePage="changePage">
      <el-button slot="btn" class="btn" @click="$router.push(`/manage-base-info/warehouse/details/${null}`)">新增货主</el-button>
      <template v-slot:operation="{scoped:{row}}">
        <span class="check" @click="$router.push(`/manage-business/goods-owner/details/${row.id}`)">查看详情</span>
        <span class="edit" @click="$router.push(`/manage-base-info/warehouse/details/${row.id}`)">编辑</span>
        <span class="del" @click="del(row.id)">删除</span>
      </template>
    </Table>
  </div>
</template>

<script>
import SearchCard from '@/components/SearchCard'
import Table from '@/components/Table'
import { getShipper, delShipper } from '@/api/shipperManagement'
export default {
  components: { SearchCard, Table },
  data() {
    return {
      config: [
        {
          prop: 'like_code',
          label: '货主编号'
        },
        {
          prop: 'like_name',
          label: '货主名称'
        },
        {
          prop: 'like_personName',
          label: '联系人'
        }
      ],
      thead: [
        {
          prop: 'code',
          label: '货主编号'
        },
        {
          prop: 'name',
          label: '货主名称'
        },
        {
          prop: 'personName',
          label: '联系人'
        },
        {
          prop: 'phone',
          label: '联系人电话'
        },
        {
          prop: 'email',
          label: '联系邮箱'
        },
        {
          prop: 'location',
          label: '省/市/区'
        },
        {
          prop: 'address',
          label: '详细地址'
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
      tableDate: [],
      search: {
        id: '',
        like_code: '',
        like_name: '',
        like_personName: '',
        size: 10,
        current: 1
        // descs: createTime
      },
      loading: false,
      total: 0
    }
  },
  created() {
    this.getShipper(this.search)
  },
  methods: {
    async getShipper(form) {
      try {
        this.loading = true
        const { data } = await getShipper(form)
        console.log(data)
        this.tableDate = data.records
        this.total = +data.total
        this.pageSize = data.size
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    changeSize(val) {
      this.search.size = val
      this.getShipper(this.search)
    },
    changePage(val) {
      this.search.current = val
      this.getShipper(this.search)
    },
    async del(id) {
      try {
        await this.$confirm('是否确认删除该货主?', '提示', {
        // confirmButtonText: '确定',
        // cancelButtonText: '取消',
          type: 'warning'
        })
        await delShipper({ 'ids[]': id })
        this.$message.success('货主删除成功!')
        this.getShipper(this.search)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .check {
    color: #ffb200;
          font-size: 13px;
      margin-right:30px;
      cursor: pointer;
  }

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
</style>
