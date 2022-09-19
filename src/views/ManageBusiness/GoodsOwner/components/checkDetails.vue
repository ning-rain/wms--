<template>
  <div>
    <el-card class="box-card">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="基础信息" name="1">
          <div class="baseInfo">
            <el-row>
              <el-col :span="6">
                <p class="title">货主编号</p>
                <p>{{ infoList.code }}</p>
              </el-col>
              <el-col :span="6">
                <p class="title">货主名称</p>
                <p>{{ infoList.name }}</p>
              </el-col>
              <el-col :span="6">
                <p class="title">联系人</p>
                <p>{{ infoList.personName }}</p>
              </el-col>
              <el-col :span="6">
                <p class="title">联系人电话</p>
                <p>{{ infoList.phone }}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p class="title">联系人邮箱</p>
                <p>{{ infoList.email }}</p>
              </el-col>
              <el-col :span="6">
                <p class="title">省/市/区</p>
                <p>{{ infoList.location }}</p>
              </el-col>
              <el-col :span="6">
                <p class="title">详细地址</p>
                <p>{{ infoList.address }}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p class="title">备注</p>
                <p>{{ infoList.remark }}</p>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <el-card class="box-card">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="库位信息">
          <div>
            <el-row class="infoTip">
              <p>总计:{{ total }}个库位 {{ infoList.goodsTotal }}个 货品</p>
            </el-row>

            <Table :thead="thead" :table-date="tableDate" :page-size="formData.size" :total="total" :current-page="formData.current" @changeSize="changeSize" @changePage="changePage" />
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import { getOwnerDetails, getOwnerLocation } from '@/api/shipperManagement'
import Table from '@/components/Table'
export default {
  components: { Table },
  data() {
    return {
      activeNames: ['1'],
      infoList: [],
      thead: [
        {
          prop: 'warehouseName',
          label: '仓库名称',
          width: '275'
        },
        {
          prop: 'areaName',
          label: '库区名称',
          width: '275'
        },
        {
          prop: 'locationCode',
          label: '库位编号',
          width: '270'
        },
        {
          prop: 'locationName',
          label: '库位名称',
          width: '270'
        }
      ],
      tableDate: [],
      formData: {
        id: '',
        size: 10,
        current: 1,
        ownerId: this.$route.params.id
      },
      total: 0
    }
  },
  created() {
    this.getOwnerDetails()
    this.getOwnerLocation()
  },
  methods: {
    async getOwnerDetails() {
      const { data } = await getOwnerDetails(this.$route.params.id)
      console.log(data)
      this.infoList = data
    },
    async getOwnerLocation() {
      const { data } = await getOwnerLocation(this.formData)
      console.log(data)
      this.tableDate = data.records
      this.total = +data.total
    },
    changeSize(val) {
      this.formData.size = val
      this.getOwnerLocation(this.formData)
    },
    changePage(val) {
      this.formData.current = val
      this.getOwnerLocation(this.formData)
    }
  }
}
</script>

<style scoped lang="scss">
.box-card {
      padding: 10px;
      background: #fff;
    border-radius: 12px;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    margin-bottom:20px;

    .baseInfo {
        background: #fdfcf9;
    border: 1px solid #f7f2f1;
    padding: 25px 30px;

    .title {
        color: #887e7e;
    }
}

.infoTip {
    width:220px;
    height: 32px;
    line-height: 10px;
    background: #fff9eb;
    border: 1px solid #ffb200;
    padding: 0 25px;
    margin: 20px 0;
}

.el-collapse {
        border:0;
}
    }

</style>
