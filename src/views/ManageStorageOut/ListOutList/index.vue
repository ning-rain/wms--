<template>
  <div>
    <!-- 搜索 -->
    <SearchCard
      :config="config"
      @getFormData="getFormData"
      @resetlist="getOutBoundList"
    />
    <!-- 表单 -->
    <Table
      :thead="thead"
      :table-date="list"
      :total="total"
      :page-sizes="pageSizes"
      @changeSize="changeSize"
      @changePage="changePage"
    >
      <template slot="btn">
        <el-button
          class="btn"
          type="success"
          round
          @click="$router.push(`/manage-storage-out/list-out/details/${null}`)"
        >
          新增出库单
        </el-button>
      </template>
      <template #status="{ scoped: { row }}">
        {{ formateStatus (row.status) }}
      </template>
      <template #type="{ scoped: { row }}">
        {{ outType (row.type) }}
      </template>
      <template #operate="{ scoped: { row }}">
        <el-row v-if="row.status === 1">
          <el-col :span="8">
            <el-button class="look" @click="deitBtn(row)">修改详情</el-button>
          </el-col>
          <el-col :span="8">
            <el-button class="look" style="padding: 12px 5px;" @click="picking(row)">生成拣货任务</el-button>
          </el-col>
          <el-col :span="8">
            <el-button class="look" @click="cancelBtn(row)">取消</el-button>
          </el-col>
        </el-row>
        <el-button v-else class="look" @click="look(row)">查看详情</el-button>
      </template>
    </Table>
    <!-- 生成拣货任务 -->
    <el-dialog
      title="生成拣货任务"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="body">
        <div class="spanSubTitle">
          {{ pickingList.length }}个拣货任务生成失败！
        </div>
        <div class="divFailureMsg">
          拣货任务生成失败原因如下
        </div>
        <div
          v-for="(item,index) in pickingList"
          :key="index"
          class="divItemList"
        >
          {{ item }}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="okBtn" round @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getOutBoundList, cancel, getPicking } from '@/api/storageOut'
export default {
  data() {
    return {
      search: {
        code: '',
        billCode: '',
        ownerName: '',
        size: 10,
        current: 1
      },
      config: [
        { label: '出库单号', prop: 'code' },
        { label: '运单编号', prop: 'billCode' },
        { label: '货主名称', prop: 'ownerName' }
      ],
      thead: [
        {
          label: '出库单号',
          prop: 'code'
        },
        {
          label: '货主运单编号',
          prop: 'billCode'
        },
        {
          label: '出库类型',
          prop: 'type',
          slotName: 'type'
        },
        {
          label: '货主名称',
          prop: 'ownerName'
        },
        {
          label: '出库仓库',
          prop: 'warehouseName'
        },
        {
          label: '出库库区',
          prop: 'areaName'
        },
        {
          label: '计划出库时间',
          prop: 'planOutTime',
          width: '170',
          sortable: true
        },
        {
          label: '货品数量',
          prop: 'goodsNum',
          sortable: true
        },
        {
          label: '出库单状态',
          prop: 'status',
          slotName: 'status',
          filters: [
            { 'text': '新建', 'value': '1' },
            { 'text': '拣货中', 'value': '2' },
            { 'text': '已取消', 'value': '3' },
            { 'text': '拣货完成', 'value': '4' },
            { 'text': '交接中', 'value': '5' },
            { 'text': '交接完成', 'value': '6' }
          ],
          filterMethod: this.filterHandler
        },
        {
          label: '创建人',
          prop: 'createName'
        },
        {
          label: '创建时间',
          prop: 'createTime',
          width: '170',
          sortable: true
        },
        {
          label: '操作',
          slotName: 'operate',
          fixed: 'right',
          width: '270'
        }
      ],
      list: [],
      total: 0,
      pageSizes: [10, 20, 30, 40],
      dialogVisible: false,
      pickingList: []
    }
  },
  created() {
    this.getOutBoundList(this.search)
  },
  methods: {
    async getOutBoundList(obj) {
      try {
        const { data } = await getOutBoundList(obj)
        // console.log(data)
        this.list = data.records
        this.total = Number(data.total)
      } catch (e) {
        console.log(e)
      }
    },
    formateStatus(val) {
      if (val === 1) {
        return '新建'
      }
      if (val === 2) {
        return '拣货中'
      }
      if (val === 3) {
        return '已取消'
      }
      if (val === 4) {
        return '拣货完成'
      }
      if (val === 5) {
        return '交接中'
      }
      if (val === 6) {
        return '交接完成'
      }
    },
    outType(val) {
      if (val === '0') {
        return 'B2B出库'
      }
    },
    // 查看操作
    look(row) {
      // console.log(row)
      this.$router.push(`list-detail/${row.id}`)
    },
    changePage(val) {
      // console.log(val)
      this.search.current = val
      this.getOutBoundList(this.search)
    },
    changeSize(val) {
      // console.log(val)
      this.search.size = val
      this.getOutBoundList(this.search)
    },
    getFormData(obj) {
      this.getOutBoundList(obj)
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === Number(value)
    },
    cancelBtn(row) { // 取消操作
      this.$confirm(`确认取消出库单${row.code}吗？`, '取消确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        roundButton: true,
        confirmButtonClass: 'search-bt'
      }).then(async() => {
        try {
          await cancel({
            id: row.id,
            status: row.status
          })
          // console.log(res)
          this.getOutBoundList()
          this.$message.success('取消成功')
        } catch (e) {
          // console.dir(e)
          // this.$message.error(e.response.data.message)
          this.$message.error('只能取消新建的出库单')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deitBtn(row) {
      // console.log(row)
      this.$router.push(`/manage-storage-out/list-out/details/${row.id}`)
      // 点击修改详情的时候 新增出库单的那个title要变成编辑出库单
      const index = this.$store.state.app.navArr.length - 1
      this.$store.commit('app/EDIT_NAVBARITEM', { index, title: '编辑出库单' })
    },
    async picking(row) { // 生成拣货任务
      // console.log(row)
      const arr = []
      arr.push(row.id)
      // console.log(arr)
      try {
        const { data } = await getPicking(arr)
        // console.log(data)
        this.pickingList = data.errors
        // console.log(this.pickingList)
      } catch (e) {
        console.log(e)
      }
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='scss' scoped>
.btn {
  background: #00be76;
}
.look{
  color:#FFB200;
  border:unset;
  background-color: transparent;
}
.look:hover {
  color: #FF8E00;
}
.search-btn {
  background-color: #ffb200;
}
.okBtn {
  background-color: #ffb200;
  border: #ffb200;
  color: #000;
}
.body {
  background: #f9f9f9;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 23px;
  padding: 21px 20px 50px 21px;

  .spanSubTitle {
    height: 24px;
    font-size: 16px;
    font-family: PingFangSC,PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #332929;
    line-height: 24px;
  }

  .divFailureMsg{
    color: #d9021c;
    height: 22px;
    font-size: 14px;
    font-family: PingFangSC,PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    line-height: 22px;
    margin-top: 11px;
    margin-bottom: 6px;
    text-align: center;
  }

  .divItemList{
    font-size: 14px;
    font-family: PingFangSC,PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #b5abab;
    line-height: 22px;
    padding-right: 10px;
    text-align: left;
  }
}

</style>
