<template>
  <el-dialog
    title="添加货品类型"
    :visible="diaLogVisible"
    width="30%"
    :before-close="handleClose"
    class="goodstype-dialog"
  >
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      label-position="top"
    >
      <el-form-item label="货品类型编码" prop="code">
        <el-input v-model="form.code" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="货品类型名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" round>取 消</el-button>
      <el-button type="warning" round @click="addGoodsType">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getNextCode, addGoodsType, editGoodsType } from "@/api/manageBaseInfo";
export default {
  props: {
    diaLogVisible: {
      type: Boolean,
      default: false,
    },
    dialogType: {
      type: String,
      default: "add",
    },
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    if (this.dialogType == "add") {
      this.getNextCode();
    } else {
      this.form = { ...this.info };
    }
  },
  data() {
    return {
      form: {
        code: "",
        name: "",
      },
      rules: {
        code: [{ required: true, message: "必填项", trigger: "blur" }],
        name: [{ required: true, message: "必填项", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleClose() {
      this.$emit("update:diaLogVisible", false);
      this.$parent.getList();
    },
    async getNextCode() {
      const { data } = await getNextCode("HPLX");
      this.form.code = data;
      console.log(data);
    },
    async addGoodsType() {
      if (this.dialogType == "add") {
        await addGoodsType(this.form);
        this.$message.success("添加商品类型成功~！");
      } else {
        await editGoodsType(this.form);
        this.$message.success("更新商品类型成功~！");
      }
      this.handleClose();
    },
  },
};
</script>

<style lang="scss">
.goodstype-dialog {
  .el-form-item__label {
    font-weight: 400;
    font-size: 12px;
    padding: unset;
  }
  .el-input__inner {
    background-color: #f8f5f5;
  }
}
</style>
