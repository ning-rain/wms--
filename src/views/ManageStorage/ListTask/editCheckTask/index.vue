<template>
  <div>
    <el-card>
      <Table :thead="isShow ? thead : thead1" :table-date="tableDate">
        <template slot="operation">
          <div v-if="isEdit" class="checkNum">
            <span>{{ input }}</span>
            <i class="el-icon-edit-outline" @click="editBtn" />
          </div>
          <div v-else class="checkNum">
            <el-input v-model="input" />
            <i class="el-icon-check" @click="sureBtn" />
          </div>
        </template>
      </Table>
      <div class="buttonBox">
        <el-button round @click="$router.back()">返回</el-button>
        <el-button type="warning" round @click="$router.push('/manage-storage/list-task')">提交</el-button>
      </div>
      <!-- <div v-if="isEdit" class="checkNum">
        <span>{{ input }}</span>
        <i class="el-icon-edit-outline" @click="editBtn" />
      </div>
      <div v-else class="checkNum">
        <el-input v-model="input" />
        <i class="el-icon-check" @click="sureBtn" />
      </div> -->
    </el-card>
  </div>
</template>

<script>
import { getCheckListList } from '@/api/ManageStorage'
export default {
  data() {
    return {
      thead: [
        { label: '仓库名称', prop: 'warehouseName', slotName: '' },
        { label: '库区名称', prop: 'areaName', slotName: '' },
        { label: '库位编码', prop: 'locationCode', slotName: '' },
        { label: '库位名称', prop: 'locationName', slotName: '' },
        { label: '货品名称', prop: 'goodsName', slotName: '' },
        { label: '货品编码', prop: 'goodsCode', slotName: '', filter: '' },
        { label: '货品条码', prop: 'goodsBarCode', slotName: '' },
        { label: '货主名称', prop: 'ownerName', slotName: '' },
        { label: '库存数量', prop: 'stockNum', slotName: '' },
        { label: '实盘数量', prop: 'checkNum', slotName: 'operation' },
        { label: '差异', prop: 'differenceNum', slotName: '' }
      ],
      thead1: [
        { label: '仓库名称', prop: 'warehouseName', slotName: '' },
        { label: '库区名称', prop: 'areaName', slotName: '' },
        { label: '库位编码', prop: 'locationCode', slotName: '' },
        { label: '库位名称', prop: 'locationName', slotName: '' },
        { label: '货品名称', prop: 'goodsName', slotName: '' },
        { label: '货品编码', prop: 'goodsCode', slotName: '', filter: '' },
        { label: '货品条码', prop: 'goodsBarCode', slotName: '' },
        { label: '货主名称', prop: 'ownerName', slotName: '' },
        { label: '库存数量', prop: 'stockNum', slotName: '' },
        { label: '实盘数量', prop: 'checkNum', slotName: '' },
        { label: '差异', prop: 'differenceNum', slotName: '' }
      ],
      tableDate: [],
      input: '',
      isEdit: true
    }
  },
  computed: {
    isShow() {
      const id = this.$route.params.id
      return id.charAt(id.length - 1) === '1'
    }
  },
  mounted() {
    this.getCheckListList()
  },
  methods: {
    async getCheckListList() {
      const id = this.$route.params.id
      const { data: { records }} = await getCheckListList({
        masterId: id.slice(0, id.length - 4),
        current: 1,
        size: 10,
        status: 1
      })
      console.log(records)
      this.tableDate = records
    },
    submitBtn() {

    },
    editBtn() {
      console.log(1)
      this.$nextTick(() => {
        this.isEdit = false
      })
      console.log(this.isEdit)
    },
    sureBtn() {
      this.isEdit = true
    }
  }
}
</script>

<style lang='scss'>
.checkNum {
    display: flex;
    justify-content: space-between;
    i {
        font-size: 22px;
        color: #ffc641;
    }
}
.buttonBox {
      padding: 25px 0 0;
    margin: 0 -30px -5px;
    border-top: 1px solid #f5efee;
    text-align: center;
    .el-button {
        width: 150px;
    }
}
</style>
