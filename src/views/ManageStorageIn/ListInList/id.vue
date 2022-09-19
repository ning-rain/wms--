<template>
  <div>
    <el-card class="box-card">
      <el-row type="flex" align="middle" justify="center">
        <el-steps style="flex-basis: 50%;" :active="active" finish-status="success">
          <el-step title="填写出库基础信息" />
          <el-step title="填写承运商信息" />
          <el-step title="填写货品明细信息" />
        </el-steps>
      </el-row>
      <el-form :label-position="'top'" :model="formData" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="出库单号" prop="code">
              <el-input v-model="formData.code" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="100px" label="仓库名称" prop="warehouseId">
              <el-select
                v-model="formData.warehouseId"
                style="width: 100%;"
                placeholder="请选择"
                @change="changeWareHouse"
              >
                <el-option
                  v-for="item in warehouseName"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库区名称" prop="areaId">
              <el-select
                v-model="formData.areaId"
                style="width: 100%;"
                placeholder="请选择"
                @change="getOwner"
              >
                <el-option v-for="item in area" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="货主" prop="name" placeholder="请输入货主名称/编码">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出库类型" prop="name">
              <el-select style="width: 100%;" placeholder="请选择">
                <el-option label="一号仓库" value="shanghai" />
                <el-option label="二号仓库" value="beijing" />
                <el-option label="三号仓库" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注" prop="name" placeholder="请输入">
              <el-input />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getCodeFactory,
  getWareHouse,
  getArea,
  getOwner,
} from '@/api/storageOut'
export default {
  data() {
    return {
      active: 0,
      name: 'HP',
      formData: {
        code: '',
        warehouseId: '',
        areaId: '',
      },
      warehouseName: [],
      area: [], // 库区名称
      rules: {
        code: [{ required: true, message: '请输入', trigger: 'blur' }],
        warehouseId: [
          { required: true, message: '请选择仓库名称', trigger: 'blur' },
        ],
        areaId: [
          { required: true, message: '请输入库区名称', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getCodeFactory()
    this.getWareHouse()
  },
  methods: {
    async getCodeFactory() {
      try {
        const res = await getCodeFactory(this.name)
        this.formData.code = res.data
        // console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    async getWareHouse() {
      // 查询全部仓库
      try {
        const { data } = await getWareHouse({
          status: 1,
        })
        // console.log(data)
        data.forEach((ele) => {
          const obj = { id: ele.id, name: ele.name }
          this.warehouseName.push(obj)
        })
        // console.log(this.warehouseName)
      } catch (e) {
        console.log(e)
      }
    },
    async changeWareHouse(id) {
      // 查询全部库区
      // console.log(id)
      try {
        const { data } = await getArea({
          warehouseId: id,
        })
        data.forEach((ele) => {
          const obj = { id: ele.id, name: ele.name }
          this.area.push(obj)
        })
        console.log(this.area)
      } catch (e) {
        console.log(e)
      }
    },
    async getOwner(id) {
      try {
        const res = await getOwner({
          areaId: id,
        })
        console.log(id)
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .box-card {
  padding: 10px;
  border-radius: 12px;
  .el-col-8 {
    padding-left: 15px;
    padding-right: 15px;
  }
  .el-form-item__label {
    color: #887e7e;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
  }

  .el-input__inner {
    border: 1px solid #f8f5f5;
    background: #f8f5f5;
    border-radius: 6px;
  }
  .el-input.is-disabled .el-input__inner {
    background: #f3ebeb !important;
    border-color: #f3ebeb;
    color: #b5abab;
  }
}
</style>