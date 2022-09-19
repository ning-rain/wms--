<template>
  <el-dialog
    title="盘点任务生成"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <div class="checkTaskInfo">
      <h3 v-if="results.length && errors.length"> {{ results.length }}个盘点任务生成成功! {{ errors.length }}个盘点任务生成失败</h3>
      <h3 v-if="results.length && !errors.length"> {{ results.length }}个盘点任务生成成功!</h3>
      <h3 v-else>{{ errors.length }}个盘点任务生成失败</h3>
      <p v-if="results.length !==0" style="color: #ffb201">盘点任务编号如下，请在盘点任务中查看</p>
    </div>
    <div>{{ results.join('、') }}</div>
    <div class="checkTaskInfo">
      <p v-if="errors.length !==0" style="color:red">盘点任务生成失败原因如下</p>
    </div>
    <div style="text-align:left">{{ errors.join('、') }}</div>
    <span slot="footer" class="dialog-footer">
      <el-button type="warning" round @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Array,
      default: () => []
    },
    results: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style>
.el-dialog__body {
    background: #f9f9f9;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    margin: 20px;
    padding: 21px 20px 14px 21px;
}
.checkTaskInfo {
  text-align: center;
}
</style>
