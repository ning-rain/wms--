<template>
  <div class="container">
    <el-card>
      <el-form ref="locationForm" :model="LocationForm" :label-position="labelPosition" :rules="rules">
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="库区" prop="location">
              <el-cascader
                v-model="LocationForm.location"
                :options="options"
                @change="handleChange"
                @expand-change="expandChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库位编号" prop="code">
              <el-input v-model="LocationForm.code" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库位名称" prop="name">
              <el-input v-model="LocationForm.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="温度类型" prop="temperatureType">
              <el-select v-model="LocationForm.temperatureType" placeholder="请选择">
                <el-option
                  v-for="item,index in temperatureType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="承重类型" prop="bearingType">
              <el-select v-model="LocationForm.bearingType" placeholder="请选择">
                <el-option
                  v-for="item,index in bearingType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用途属性" prop="useType">
              <el-select v-model="LocationForm.useType" placeholder="请选择">
                <el-option
                  v-for="item,index in useType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="停用状态" prop="status">
              <el-radio-group v-model="LocationForm.status">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="承载体积" prop="maxVolume">
              <el-input v-model="LocationForm.maxVolume" placeholder="请输入">
                <template slot="append">m³</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承载上线" prop="maxNum">
              <el-input v-model="LocationForm.maxNum" placeholder="请输入">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承载重量" prop="maxWeight">
              <el-input v-model="LocationForm.maxWeight" placeholder="请输入">
                <template slot="append">
                  Kg
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">

          <el-col :span="12">
            <el-row :gutter="15">
              <el-col :span="8">
                <el-form-item label="库位排/列/层" prop="locationRow">
                  <el-input v-model="LocationForm.locationRow" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="88" class="noneNmae" prop="locationColumn">
                  <el-input v-model="LocationForm.locationColumn" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="88" class="noneNmae" prop="locationLayer">
                  <el-input v-model="LocationForm.locationLayer" placeholder="请输入" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="12">
            <el-row :gutter="15">
              <el-col :span="8">
                <el-form-item label="库位长/宽/高" prop="locationLength">
                  <el-input v-model="LocationForm.locationLength" placeholder="请输入">
                    <template slot="append">
                      cm
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="88" class="noneNmae" prop="locationWidth">
                  <el-input v-model="LocationForm.locationWidth" placeholder="请输入">
                    <template slot="append">
                      cm
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="88" class="noneNmae" prop="locationHigh">
                  <el-input v-model="LocationForm.locationHigh" placeholder="请输入">
                    <template slot="append">
                      cm
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
      <footer>
        <el-button class="back">返回</el-button>
        <el-button class="submit" @click="submit">提交</el-button>
      </footer>
    </el-card>
  </div>
</template>

<script>
import { getWarehouseList,
  getAreaList,
  codeFactoryNext,
  addLocation,
  getApiArea,
  getApiLocation,
  putLocation } from '@/api/manageBaseInfo'

export default {
  data() {
    return {
      LocationForm: {
        location: ['798977092237656129', '798977987620897121'],
        areaId: '',
        code: '',
        name: '',
        temperatureType: '',
        bearingType: '',
        useType: '',
        status: 1,
        maxVolume: '',
        maxNum: '',
        locationRow: '',
        locationColumn: '',
        locationLayer: '',
        locationWidth: '',
        locationHigh: '',
        warehouseId: ''
      },
      rules: {
        location: [
          { required: true, message: '请选择库区', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入库位名称', trigger: 'blur' }
        ],
        temperatureType: [
          { required: true, message: '请选择温度类型', trigger: 'blur' }
        ],
        bearingType: [
          { required: true, message: '请选择承重类型', trigger: 'blur' }
        ],
        useType: [
          { required: true, message: '请选择用途属性', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择停用状态', trigger: 'blur' }
        ],
        maxVolume: [
          { required: true, message: '请输入小数', trigger: 'blur' }
        ]
      },
      temperatureType: [
        {
          label: '常温',
          value: 'CW'
        },
        {
          label: '冷藏',
          value: 'LC'
        },
        {
          label: '恒温',
          value: 'HW'
        }

      ],
      bearingType: [
        {
          label: '重型',
          value: 'ZX'
        },
        {
          label: '轻型',
          value: 'QX'
        },
        {
          label: '中型',
          value: 'BX'
        }
      ],
      useType: [
        {
          label: '入库缓存区',
          value: 'RKHCQ'
        },
        {
          label: '出库缓存区',
          value: 'CKHCQ'
        },
        {
          label: '存储区',
          value: 'CCQ'
        },
        {
          label: '分拣区',
          value: 'FJQ'
        },
        {
          label: '质检区',
          value: 'ZJQ'
        }
      ],
      options: [],
      optionsChild: [],
      labelPosition: 'top'
    }
  },
  async created() {
    this._getWarehouseList()
    this.codeFactoryNext()
    // id不为null，说明是编辑
    if (this.$route.params.id !== 'null') {
      const { data } = await getApiLocation(this.$route.params.id)
      this.backLocation(data)
    }
  },
  methods: {
    // 编辑时有数据
    async backLocation(data) {
      this.LocationForm = data
      await this._getWarehouseList()
      await this.expandChange([data.warehouseId])
      this.$nextTick(() => {
        this.$set(this.LocationForm, 'location', [data.warehouseId, data.areaId])
      })
    },
    // 库位编码
    async codeFactoryNext() {
      const { data } = await codeFactoryNext('KW')
      this.$set(this.LocationForm, 'code', data)
    },
    // 库区一级数据
    async _getWarehouseList() {
      const status = {
        status: 1
      }
      const { data } = await getWarehouseList(status)
      this.options = data.map((item) => {
        return { label: item.name, value: item.id, children: [] }
      })
    },
    // 库区选择项
    handleChange(val) {
      if (val) {
        this._getAreaList(val)
      }
    },
    async _getAreaList(val) {
      // val[1]为库区ID,通过库区ID获取库区详细信息
      const id = val[1]
      const { data } = await getApiArea(id)
      this.$set(this.LocationForm, 'temperatureType', data.temperatureType)
      this.$set(this.LocationForm, 'bearingType', data.bearingType)
      this.$set(this.LocationForm, 'useType', data.useType)
    },
    // 库区二级数据
    async  expandChange(id) {
      const warehouseId = { warehouseId: id[0] }
      const { data } = await getAreaList(warehouseId)
      // 获取第二级数据
      this.optionsChild = data.map((item) => {
        return { label: item.name, value: item.id }
      })
      // 找到父级，通过ID找到对应的父级
      const index = this.options.findIndex(ele =>
        ele.value === id[0])
      console.log(index)
      // 把二级的数据赋值给对应的父级的children
      console.log(this.options[index])
      this.options[index].children = [...this.optionsChild]
    },
    async submit() {
      this.$refs.locationForm.validate(async(valid) => {
        if (valid) {
          this.$set(this.LocationForm, 'areaId', this.LocationForm.location[1])
          this.$set(this.LocationForm, 'warehouseId', this.LocationForm.location[0])
          console.log('this.LocationForm', this.LocationForm)
          if (this.$route.params.id === 'null') { // 新增
            const res = await addLocation(this.LocationForm)
          } else { // 编辑
            const res2 = await putLocation(this.LocationForm)
          }

          this.$message.success('恭喜你,提交成功')
          this.$router.push('/manage-base-info/location')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .noneNmae{
  .el-form-item__label{
    opacity: 0;
  }
}
footer{
  display:flex;
  justify-content:center ;
  border-top: 1px solid #f5efee;
  margin-top: 10px;
  padding-top: 30px;
  .back{
    width: 170px;
    margin: 0 15px;
    height: 40px;
    border-radius: 20px;
    background: #f8f5f5;
    border-color:#f8f5f5;
    color: #332929;
    &:hover{
      background: #ffb200;
      border-color: #ffb200;
    }
  }
  .submit{
    width: 170px;
    margin: 0 15px;
    height: 40px;
    border-radius: 20px;
    background: #ffb200;
    border-color:#ffb200;
    color: #332929;
    &:hover{
      background: #ff8e00;
      border-color: #ff8e00;
    }
  }
}
</style>
