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
      <el-form
        ref="addForm"
        :label-position="'top'"
        :model="formData"
        :rules="rules"
      >
        <!-- 第一个步骤的表单 -->
        <div v-if="active===0">
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
                  clearable
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
                  clearable
                  style="width: 100%;"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in area"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="货主" prop="ownerId">
                <el-select
                  v-model="formData.ownerId"
                  :filterable="true"
                  clearable
                  remote
                  style="width: 100%;"
                  reserve-keyword
                  placeholder="请输入货主名称/编码"
                >
                  <el-option
                    v-for="item in personName"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出库类型" prop="type">
                <el-select
                  v-model="formData.type"
                  style="width: 100%;"
                  placeholder="请选择"
                >
                  <el-option label="B2B出库" value="0" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注" prop="name">
                <el-input v-model="formData.remark" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 第二个表单 -->
        <div v-else-if="active===1">
          <el-row>
            <el-col :span="6">
              <el-form-item label="运单单号" prop="billCode">
                <el-input v-model="formData.billCode" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="100px" label="承运商" prop="carrierId">
                <el-select
                  v-model="formData.carrierId"
                  clearable
                  style="width: 100%;"
                  placeholder="请选择"
                >
                  <el-option
                    label="品达物流"
                    value="0"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="计划出库时间" prop="planOutTime">
                <el-date-picker
                  v-model="formData.planOutTime"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd HH:MM:SS"
                  default-time="['00:00:00']"
                  type="date"
                  placeholder="选择日期时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="司机姓名" prop="driverName">
                <el-input v-model="formData.driverName" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="司机电话" prop="driverPhone">
                <el-input v-model="formData.driverPhone" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="车牌号" prop="license">
                <el-input v-model="formData.license" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收货人名称" prop="receiverName">
                <el-input v-model="formData.receiverName" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-else>
          <addGoods />
        </div>
        <el-row type="flex" align="middle" justify="center">
          <el-button round style="margin-top: 15px;width: 170px;" @click="back">返回</el-button>
          <el-button v-if="active===2" round style="margin-top: 15px;width: 170px;" @click="addOut">提交</el-button>
          <el-button v-else round style="margin-top: 15px;width: 170px;" @click="next">下一步</el-button>
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
  getAddOutbound,
  checkOutbound
} from '@/api/storageOut'
import addGoods from './addGoods.vue'
export default {
  components: {
    addGoods
  },
  data() {
    return {
      active: 0,
      name: 'HP',
      formData: {
        code: '',
        warehouseId: '',
        areaId: '',
        ownerId: '',
        type: '',
        remark: '',
        billCode: '', // 运单单号
        carrierId: '', // 承运商id
        planOutTime: '',
        driverName: '', // 司机名字
        driverPhone: '', // 司机电话
        license: '', // 车牌号
        receiverName: '', // 收货人名字
        status: 1
      },
      warehouseName: [],
      area: [], // 库区名称
      personName: [],
      rules: {
        code: [{ required: true, message: '请输入', trigger: 'blur' }],
        warehouseId: [{ required: true, message: '请选择仓库名称', trigger: 'blur' }],
        areaId: [{ required: true, message: '请输入库区名称', trigger: 'blur' }],
        ownerId: [{ required: true, message: '请输入货主名称', trigger: 'blur' }],
        type: [{ required: true, message: '请输入出库类型', trigger: 'blur' }],
        billCode: [{ required: true, message: '请输入运单单号', trigger: 'blur' }],
        carrierId: [{ required: true, message: '请选择承运商', trigger: 'blur' }],
        planOutTime: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        driverName: [{ required: true, message: '请输入司机名字', trigger: 'blur' }],
        driverPhone: [
          { required: true, message: '请输入司机电话', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        license: [{ required: true, message: '请输入车牌号', trigger: 'blur' }],
        receiverName: [{ required: true, message: '请输入收货人名字', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCodeFactory()
    this.getWareHouse()
    this.getOwner()
    console.log(this.$route.params.id)
  },
  mounted() {
    if (this.$route.params.id && this.$route.params.id !== 'null') {
      this.checkOutbound()
    }
  },
  methods: {
    async  getCodeFactory() {
      try {
        const res = await getCodeFactory(this.name)
        this.formData.code = res.data
        // console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    async getWareHouse() { // 查询全部仓库
      try {
        const { data } = await getWareHouse({
          status: 1
        })
        // console.log(data)
        data.forEach(ele => {
          const obj = { id: ele.id, name: ele.name }
          this.warehouseName.push(obj)
        })
        // console.log(this.warehouseName)
      } catch (e) {
        console.log(e)
      }
    },
    async changeWareHouse(id) { // 查询全部库区
      // console.log(id)
      try {
        const { data } = await getArea({
          warehouseId: id
        })
        data.forEach(ele => {
          const obj = { id: ele.id, name: ele.name }
          this.area.push(obj)
        })
        // console.log(this.area)
      } catch (e) {
        console.log(e)
      }
    },
    async getOwner() { // 货主
      try {
        const { data } = await getOwner()
        // console.log(data)
        data.forEach(ele => {
          const obj = { id: ele.id, name: ele.name }
          this.personName.push(obj)
        })
        // this.personName = new Set(this.personName)
        // console.log(this.personName)
      } catch (e) {
        console.log(e)
      }
    },
    async getAddOutbound() {
      try {
        await getAddOutbound(this.formData)
        // console.log(res)
        this.$message.success('恭喜你，提交成功！')
      } catch (e) {
        console.log(e)
      }
    },
    next() {
      // console.log(this.active)
      this.$refs.addForm.validate(vali => {
        if (vali) {
          if (this.active++ > 2) this.active = 0
        }
        // console.log(this.active)
        if (this.active === 2) {
          this.getAddOutbound()
        }
      })
    },
    back() {
      console.log(this.active)
      if (this.active > 0) {
        this.active -= 1
      } else if (this.active === 0) {
        this.$router.back()
      }
    },
    addOut() {
      this.$router.push('/manage-storage-out/list-out')
    },
    async checkOutbound() {
      try {
        const { data } = await checkOutbound(this.$route.params.id)
        // console.log(data)
        this.formData = data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep  .box-card {
  padding: 10px;
  border-radius: 12px;
  .el-col-8 {
    padding-left: 15px;
    padding-right: 15px;
  }
  .el-form-item__label {
    color: #887e7e;
    font-size: 12px;
    font-family: PingFangSC,PingFangSC-Medium;
    font-weight: 500;
  }

  .el-input__inner {
    border: 1px solid #f8f5f5;
    background: #f8f5f5 ;
    border-radius: 6px;
  }
 .el-input.is-disabled .el-input__inner {
    background: #f3ebeb !important;
    border-color: #f3ebeb;
    color: #b5abab;
  }
  .el-col-6 {
    padding-left: 15px;
    padding-right: 15px;
  }

  }
</style>
