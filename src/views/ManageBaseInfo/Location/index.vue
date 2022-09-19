<template>
  <div>
    <SearchCard :config="config" @getFormData="getFormData" />
    <el-card>
      <el-row type="flex" justify="space-between" class="locationBtn">

        <el-col :span="3">
          <div class="btn-left">
            <el-button type="primary" @click="addLoction">新增库位</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="btn-right">
            <el-button class="donationBtn" @click="downLoadExcel">下载库位模版</el-button>
            <el-button class="donationBtn" @click="importLoction">导入库位信息</el-button>
          </div>
        </el-col>

      </el-row>
      <myTable
        :table-list="tableList"
        :current="searchTerm.current"
        :total="total"
        :size="searchTerm.size"
        :loading="loading"
        @changePage="changePage"
        @changeSize="changeSize"
        @refresh="refresh"
      />
    </el-card>

    <el-dialog
      title="导入库位"
      width="500px"
      :visible.sync="loctionVisible"
    >
      <el-upload
        class="upload-demo"
        drag
        :limit="1"
        action="`${process.env.NODE_ENV}/api/location/upload`"
        multiple
        :http-request="uploadFile"
        accept=".xlsx, .xls"
      >
        <!-- :auto-upload="false" -->
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">仅支持单个表单文件导入</div>
      </el-upload>
      <div class="btnGroup">
        <el-button @click="loctionVisible=false">取消</el-button>
        <el-button @click="postFile">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import SearchCard from '@/components/SearchCard'
import { getLocationPageDetail, locationUpload } from '@/api/manageBaseInfo'
import myTable from './components/myTable'

export default {
  name: 'Location',
  components: { SearchCard, myTable },
  data() {
    return {
      searchTerm: {
        areaName: '',
        name: '',
        current: 1,
        size: 10
      },
      labelPosition: 'top',
      config: [
        { prop: 'areaName', label: '库区名称', type: '' },
        { prop: 'name', label: '库位名称', type: '' },
        { prop: 'status', label: '库位状态', type: 'select',
          children: [{
            value: '',
            label: '全部'
          },
          {
            value: 0,
            label: '停用'
          },
          {
            value: 1,
            label: '启用'
          }] }
      ],
      tableList: [],
      total: 0,
      loading: false,
      loctionVisible: false,
      file: ''
    }
  },
  created() {
    this._getLocationPageDetail()
  },
  methods: {
    // 搜索
    getFormData(form) {
      Object.assign(this.searchTerm, form)
      if (this.searchTerm.status === '') {
        delete this.searchTerm.status
      }
      this._getLocationPageDetail()
    },
    // 重置
    getwarehouseList() {
      this.searchTerm = {
        areaName: '',
        name: '',
        current: 1,
        size: 10
      }
      this._getLocationPageDetail()
    },
    async  _getLocationPageDetail() {
      this.loading = true
      const { data } = await getLocationPageDetail(this.searchTerm)
      console.log('data', data)
      this.tableList = data.records
      this.total = +data.total
      this.loading = false
    },

    changePage(val) {
      this.$set(this.searchTerm, 'current', val)
      this._getLocationPageDetail()
    },
    changeSize(val) {
      this.$set(this.searchTerm, 'size', val)
      this._getLocationPageDetail()
    },
    addLoction() {
      this.$router.push('/manage-base-info/location/detail/null')
    },
    refresh() {
      this._getLocationPageDetail()
    },
    // 下载库位模板
    downLoadExcel() {
      const a = document.createElement('a')
      a.href = '/download/locationTemplate.xlsx'
      a.download = '库位模板.xlsx'
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.remove()
    },
    // 上传文件
    uploadFile(item) {
      this.file = item.file
      console.log('item', this.file)
    },
    async postFile() {
      const fileData = new FormData()
      fileData.append('file', this.file)
      await locationUpload(fileData)
      this.loctionVisible = false
    },
    // 导入库位信息
    importLoction() {
      this.loctionVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card{
  margin-top: 20px;
}
.locationBtn{
  margin-bottom: 20px;
  .el-button--primary{
    background: #00be76;
    border-radius: 20px;
  }
}
.donationBtn{
  border-radius: 20px;
  background: #f8f5f5;
  color: #332929;
}
::v-deep .el-upload--text{
  display: flex;
  justify-content: center;
}
.el-upload__tip{
  text-align: center;
}
.btnGroup{
  display: flex;
  justify-content: end;
  .el-button{
    border-radius: 20px;
    &:nth-child(1){
      background: #f8f5f5;
      color: #332929;
    }
     &:nth-child(1){
      background: #ffb200;
      color: #332929;
    }
  }
}
</style>
