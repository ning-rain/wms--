<template>
  <div>
    <el-row>
      <el-button type="success" round @click="show">添加货品</el-button>
      <el-button round @click="open2">删除货品</el-button>
    </el-row>
    <el-row>
      <div class="box">
        <img class="img" src="@/assets/huopin.png" alt="">
        <div class="noGoods">暂无货品</div>
      </div>

    </el-row>
    <!-- 弹窗 -->
    <el-dialog
      title="添加发货货品"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="12">
          <el-form :model="formData">
            <el-row>
              <el-col :span="12">
                <el-form-item style="margin-right:15px" label="货品">
                  <el-input v-model="formData.goods" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="货主">
                  <el-input v-model="formData.owner" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-row class="btn" type="flex" align="middle" justify="end">
            <el-button round class="search-btn" @click="search">搜索</el-button>
            <el-button round class="reset-btn" @click="newBtn">重置</el-button>
          </el-row>
        </el-col>
      </el-row>
      <div class="box">
        <img class="img" src="@/assets/huopin.png" alt="">
        <div class="noGoods">暂无货品</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addGoods } from '@/api/storageOut'
export default {
  data() {
    return {
      dialogVisible: false,
      formData: {
        goods: '',
        owner: '',
        size: 10,
        current: 1
      }
    }
  },
  methods: {
    open2() {
      this.$notify({
        title: '提示',
        message: '不支持此操作',
        type: 'warning'
      })
    },
    show() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    async search() {
      try {
        await addGoods(this.formData)
      } catch (e) {
        console.log(e)
      }
      console.log(111)
    },
    newBtn() {
      this.formData.goods = ''
      this.formData.owner = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
    text-align: center;
    padding: 100px 0;
    .noGoods {
        margin-top: 15px;
        color: #b5abab;
        font-size: 14px;
    }
}
.img {
    width: 160px;
    height: 160px;
}
.btn {
    .el-button {
      color: #332929;
      border: unset;
      background-color: #f8f5f5;

      &.search-btn {
        background-color: #ffb200;
      }
      &.reset-btn {
      }
    }
}
</style>
