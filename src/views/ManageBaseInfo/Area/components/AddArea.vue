<template>
  <el-card class="add-box-card">
    <el-row type="flex">
      <el-form
        label-position="top"
        label-width="50px"
        :model="form"
        class="card-form"
        ref="formRef"
      >
        <!-- :rules="rules" -->
        <el-col :span="6">
          <el-form-item label="库区编号" prop="code">
            <el-input v-model="form.code" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属库区" prop="warehouseId">
            <el-select v-model="form.warehouseId" placeholder="请选择">
              <el-option
                v-for="item in list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="库区名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="温度类型" prop="temperatureType">
            <el-select v-model="form.temperatureType" placeholder="请选择">
              <el-option label="常温" value="CW"></el-option>
              <el-option label="冷藏" value="LC"></el-option>
              <el-option label="恒温" value="HW"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="承重类型" prop="bearingType">
            <el-select v-model="form.bearingType" placeholder="请选择">
              <el-option label="重型" value="ZX"></el-option>
              <el-option label="中型" value="BX"></el-option>
              <el-option label="轻型" value="QX"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用途属性" prop="useType">
            <el-select v-model="form.useType" placeholder="请选择">
              <el-option label="入库缓存区" value="RKHCQ"></el-option>
              <el-option label="出库缓存区" value="CKHCQ"></el-option>
              <el-option label="存储区" value="CCQ"></el-option>
              <el-option label="分拣区" value="FJQ"></el-option>
              <el-option label="质检区" value="ZJQ"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="负责人" prop="personName">
            <el-input v-model="form.personName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="库区编号">
            <el-input v-model="form.phone" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="库区状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button round class="search-btn">返回</el-button>
      <el-button round class="reset-btn" @click="submit">提交</el-button>
    </el-row>
  </el-card>
</template>

<script>
import {
  getNextCode,
  getAllWarehouseList,
  addArea,
  editArea,
} from "@/api/manageBaseInfo";

export default {
  data() {
    return {
      form: { code: "", status: 1 },
      list: [],
      warehouse: [],
    };
  },
  created() {
    if (this.addOrEdit == "add") {
      this.getNextCode();
    } else {
      this.form = this.$store.state.manageBaseInfo.currentWareHouseDetails;
    }
    this.getInfo();
    console.log(this.$route);
  },
  methods: {
    async getNextCode() {
      const { data } = await getNextCode("KQ");
      this.form.code = data;
      console.log(data);
    },
    async getInfo() {
      const { data } = await getAllWarehouseList({
        current: 1,
        size: 500,
        status: 1,
      });
      this.list = data;
    },
    async submit() {
      if (this.addOrEdit == "add") {
        await addArea(this.form);
        this.$message.success("新增库区成功！");
      } else {
        await editArea(this.form);
        this.$message.success("恭喜你！提交成功");
      }
      const index = this.$store.getters.navArr.findIndex(
        (item) => item.title == this.$route.meta.title
      );
      this.$store.commit("app/DELET_NAVBARITEM", index);
      this.$router.back();
    },
  },
  computed: {
    addOrEdit() {
      return this.$route.params.id == "null" ? "add" : "edit";
    },
  },
};
</script>

<style lang="scss">
.add-box-card {
  padding: 10px;
  border-radius: 12px;
  .card-form {
    display: flex;
    flex-wrap: wrap;
    .el-col {
      padding: 0 10px;
      margin-bottom: 20px;
      .el-form-item {
        margin-bottom: unset;
        .el-form-item__label {
          height: 30px;
          line-height: 30px;
          color: #887e7e;
          font-weight: 400;
        }
        .el-select,
        .el-cascader {
          width: 100%;
        }

        .el-input__inner {
          background-color: #f8f5f5;
        }
      }
    }
  }

  .el-button {
    color: #332929;
    border: unset;
    background-color: #f8f5f5;
    height: 40px;
    line-height: 20px;
    padding: 1px 70px;
    margin: 0 20px;
    &.search-btn {
    }
    &.reset-btn {
      background-color: #ffb200;
    }
  }
}
</style>
