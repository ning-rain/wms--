<template>
  <div>
    <!-- 搜索 -->
    <SearchCard
      :config="config"
      @getFormData="getPickingList"
      @resetlist="getPickingList"
    />
    <!-- 表单 -->
    <Table
      :thead="thead"
      :table-date="list"
      :total="total"
      :show-box="showBox"
      :page-sizes="pageSizes"
      @changeSelect="changeSelect"
      @changeallSelect="changeallSelect"
      @changeSize="changeSize"
      @changePage="changePage"
    >
      <template slot="btn">
        <el-button class="btn" type="success" round @click="pickingOkBtn">
          拣货完成
        </el-button>
      </template>
      <template #status="{ scoped: { row }}">
        {{ formateStatus (row.status) }}
      </template>
      <template #operate="{ scoped: { row }}">
        <el-button v-if="row.status !== 1" class="look" @click="look(row)">查看操作</el-button>
        <el-button v-else class="look" @click="allocation(row)">分配</el-button>
      </template>
    </Table>
    <!-- 分配弹窗 -->
    <el-dialog
      title="人员分配"
      :visible.sync="dialogVisibleFp"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <el-row type="flex" align="middle" justify="center">
          <span class="fuzeren">负责人 </span>
          <el-select clearable placeholder="请选择">
            <el-option
              label="item.label"
              value="item.value"
            />
          </el-select>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button round class="reset-btn" @click="dialogVisibleFp = false">取 消</el-button>
        <el-button type="primary" class="search-btn" round @click="dialogVisibleFp = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 拣货成功 -->
    <el-dialog
      title="生成拣货任务"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose1"
    >
      <div class="body">
        <div class="spanSubTitle">
          个拣货任务生成失败！
        </div>
        <div class="divFailureMsg">
          拣货任务生成失败原因如下
        </div>
        <div class="divItemList">
          {{ str }}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="okBtn" round @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPickingList, pickingOk } from '@/api/storageOut'
export default {
  data() {
    return {
      showBox: true,
      search: {
        code: '',
        ownerName: '',
        size: 10,
        current: 1
      },
      config: [
        { label: '拣货编号', prop: 'code' },
        { label: '货主名称', prop: 'ownerName' },
        {
          label: '拣货状态',
          prop: 'status',
          type: 'select',
          children: [
            { label: '待分配', prop: '1', value: '1' },
            { label: '拣货中', prop: '2', value: '2' },
            { label: '拣货完成', prop: '3', value: '3' }
          ]
        }
      ],
      thead: [
        {
          label: '拣货单号',
          prop: 'code'
        },
        {
          label: '出货单号',
          prop: 'outboundCode'
        },
        {
          label: '创建时间',
          prop: 'createTime',
          width: '160',
          sortable: true
        },
        {
          label: '货主名称',
          prop: 'ownerName'
        },
        {
          label: '仓库名称',
          prop: 'warehouseName'
        },
        {
          label: '库区名称',
          prop: 'areaName'
        },
        {
          label: '拣货数量',
          prop: 'pickingNum',
          sortable: true

        },
        {
          label: '拣货状态',
          prop: 'status',
          slotName: 'status',
          filters: [
            { 'text': '待分配', 'value': '1' },
            { 'text': '拣货中', 'value': '2' },
            { 'text': '拣货完成', 'value': '3' }
          ],
          filterMethod: this.filterHandler
        },
        {
          label: '负责人',
          prop: 'personName'

        },
        {
          label: '实拣数量',
          prop: 'realNum'
        },
        {
          label: '完成时间',
          prop: 'completionTime',
          width: '170',
          sortable: true
        },
        {
          label: '操作',
          slotName: 'operate',
          fixed: 'right',
          width: '200'
        }
      ],
      list: [],
      total: 0,
      pageSizes: [10, 20, 30, 40],
      dialogVisibleFp: false,
      personName: [],
      checkArr: [],
      dialogVisible: false,
      pickingList: [],
      str: ''
    }
  },
  created() {
    this.getPickingList()
  },
  methods: {
    async getPickingList(obj) {
      try {
        this.search = { ...this.search, ...obj }
        const { data } = await getPickingList(this.search)
        console.log(data)
        this.list = data.records
        this.total = Number(data.total)
      } catch (e) {
        console.log(e)
      }
    },
    formateStatus(val) {
      if (val === 1) {
        return '待分配'
      }
      if (val === 2) {
        return '拣货中'
      }
      if (val === 3) {
        return '拣货完成'
      }
    },
    // 查看操作
    look(row) {
      // console.log(row)
      // console.log(row.masterId)
      this.$router.push(`sure/${row.masterId}`)
    },
    changePage(val) {
      // console.log(val)
      this.search.current = val
      this.getPickingList()
    },
    changeSize(val) {
      // console.log(val)
      this.search.size = val
      this.getPickingList()
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === Number(value)
    },
    // 分配操作
    allocation(val) {
      // alert('111')
      this.dialogVisibleFp = true
    },
    handleClose() {
      this.dialogVisibleFp = false
    },
    handleClose1() {
      this.dialogVisible = false
    },
    processing(row) { // 拣货完成数据处理
      const arr = []
      row.forEach((ele, index) => {
        arr[index] = ele.id
      })
      this.checkArr = arr
    },
    changeSelect(row) { // 单选
      // console.log(row)
      this.processing(row)
      // console.log(this.checkArr)
    },
    changeallSelect(selection) { // 复选
      this.processing(selection)
      // console.log(this.checkArr)
    },
    async pickingOkBtn() {
      if (this.checkArr.length === 0) {
        this.$message.warning('请选择要拣货的数据')
      } else {
        try {
          const { data } = await pickingOk(this.checkArr)
          // console.log(data)
          this.pickingList = data.errors
          this.str = this.pickingList.join(',')
          console.log(this.str)
        } catch (e) {
          console.log(e)
        }
        this.dialogVisible = true
      }
      // console.log(this.checkArr)
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
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #ffb200;
    border-color: #ffb200;
}
::v-deep .el-checkbox__inner:hover {
    border-color: #ffb200;
}
.dialog-footer {
  .el-button {
      color: #332929;
      border: unset;
      background-color: #f8f5f5;

      &.search-btn {
        background-color: #ffb200;
      }
    }
}
.fuzeren {
  margin-right: 15px;
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
