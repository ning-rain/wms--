<template>
  <div>
    <el-dialog
      title="分配货主库位"
      :visible="dialogVisible"
      width="33%"
      :before-close="handleClose"
    >
      <el-cascader
        v-model="value"
        :options="options"
        @expand-change="handleChange"
      />
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" class="sure" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getWarehouse, getArealist } from '@/api/shipperManagement'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: [],
      options: [],
      status: 1
    }
  },
  created() {
    this.getWarehouse()
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },

    // 库位一级
    async getWarehouse() {
      const { data } = await getWarehouse({ status: this.status })
      console.log(data)
      this.options = data.map(item => {
        return { label: item.name, value: item.id, children: [] }
      })
    },
    // 一级选择项
    handleChange(val) {
      if (val) {
        console.log(val)
        this.getArealist(val.value)
      }
    },
    async getArealist(id) {
      const res = await getArealist({ id: id })
      console.log(res)
    }
  }
}
</script>

<style scoped lang="scss">
 ::v-deep .el-dialog__header {
    height: 56px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);

    ::v-deep  .el-dialog__header span {
                    line-height: 24px;
    font-size: 18px;
    color: #303133;
    }
}

    ::v-deep  .el-dialog__header span {
                    line-height: 24px;
    font-size: 18px;
    color: #303133;
    }

.dialog-footer {
    .cancel {
            background: #f8f5f5;
    color: #332929;
        height: 40px;
    border-radius: 20px;
    border: 0;
    font-size: 14px;
    font-family: PingFangSC,PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    padding-left: 26px;
    padding-right: 26px;
    cursor: pointer;
    outline: 0;
    }

    .sure {
        background: #ffb200;
    color: #332929;
    height: 40px;
    border-radius: 20px;
    border: 0;
    font-size: 14px;
    font-family: PingFangSC,PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    padding-left: 26px;
    padding-right: 26px;
    cursor: pointer;
    outline: 0
    }
}
</style>
