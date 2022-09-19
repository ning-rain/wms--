<template>
  <el-card class="add-box-card">
    <el-row type="flex">
      <el-form
        ref="formRef"
        label-position="top"
        label-width="50px"
        :model="form"
        class="card-form"
        :rules="rules"
      >
        <el-col :span="8">
          <el-form-item label="仓库编码" prop="code">
            <el-input v-model="form.code" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="仓库名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="仓库类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择活动区域">
              <el-option label="中转仓" value="ZZ" />
              <el-option label="加工仓" value="JG" />
              <el-option label="储备仓" value="CB" />
              <el-option label="冷藏仓" value="LC" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="省/区/市" prop="location">
            <el-cascader
              ref="unitAreacode"
              v-model="form.location"
              :options="region"
              :props="{ expandTrigger: 'hover' }"
              @change="a"
            />
            <!-- @change="handleChange" -->
          </el-form-item>
        </el-col>
        <el-col :span="8" />
        <el-col :span="16">
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="仓库状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="仓库面积" prop="surface">
            <el-input v-model="form.surface" placeholder="请输入">
              <template slot="append">m²</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="负责人" prop="personName">
            <el-input v-model="form.personName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button round class="search-btn">返回</el-button>
      <el-button round class="reset-btn" @click="add">提交</el-button>
    </el-row>
  </el-card>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { addWareHouse, getNextCode, editWareHouse } from '@/api/manageBaseInfo'
export default {
  data() {
    return {
      form: {
        code: '',
        status: 1,
        location: ['110000', '119900', '110114']
      },
      region: regionData,
      rules: {
        name: [{ required: true, message: '必填项', trigger: 'blur' }],
        type: [{ required: true, message: '必填项', trigger: 'blur' }],
        location: [{ required: true, message: '必填项', trigger: 'blur' }],
        address: [{ required: true, message: '必填项', trigger: 'blur' }],
        status: [{ required: true, message: '必填项', trigger: 'blur' }],
        surface: [{ required: true, message: '必填项', trigger: 'blur' }],
        personName: [{ required: true, message: '必填项', trigger: 'blur' }],
        phone: [
          { required: true, message: '必填项', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    addOrEdit() {
      return this.$route.params.id == 'null' ? 'add' : 'edit'
    }
  },
  mounted() {
    if (this.addOrEdit == 'edit') {
      this.form = this.$store.state.manageBaseInfo.currentWareHouseDetails
      this.form.location = [this.form.province, this.form.city, this.form.area]
    } else {
      this.getCode()
    }
  },
  methods: {
    async add() {
      this.form.location = this.$refs.unitAreacode.inputValue
      try {
        if (this.addOrEdit == 'add') {
          // this.form.location = this.$refs.unitAreacode.inputValue;
          await addWareHouse(this.form)
          this.$message.success('新增仓库成功！')
        } else {
          await editWareHouse(this.form)
          console.log(this.form)
          this.$message.success('恭喜你！提交成功')
        }
      } catch (error) {
        this.$message.error(error.message)
      }
      const index = this.$store.getters.navArr.findIndex(
        (item) => item.title == this.$route.meta.title
      )
      this.$store.commit('app/DELET_NAVBARITEM', index)
      this.$router.back()
    },
    a(val) {
      this.form.province = val[0]
      this.form.city = val[1]
      this.form.area = val[2]
      console.log(this.form)
    },
    async getCode() {
      const { data } = await getNextCode('CK')
      console.log(data)
      this.form.code = data
    }
  }
}
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
