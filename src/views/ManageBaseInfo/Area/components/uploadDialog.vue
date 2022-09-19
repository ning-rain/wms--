<template>
  <el-dialog
    title="提示"
    :visible="dialogVisible"
    width="31%"
    :before-close="handleClose"
  >
    <div class="upload-excel">
      <input
        ref="excel-upload-input"
        class="excel-upload-input"
        type="file"
        accept=".xlsx, .xls"
        @change="handleClick"
      />
      <div class="drop" @drop="handleDrop">
        <el-button size="mini" type="primary" @click="handleUpload">
          点击上传
        </el-button>
        <i class="el-icon-upload" />
        <span>将文件拖到此处</span>
      </div>
    </div>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span> -->
  </el-dialog>
</template>

<script>
import { uploadExcel } from "@/api/manageBaseInfo";

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  },
  methods: {
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    async handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.loading) return;
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$message.error("Only support uploading one file!");
        return;
      }
      const rawFile = files[0]; // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$message.error(
          "Only supports upload .xlsx, .xls, .csv suffix files"
        );
        return false;
      }
      console.log(files);
      const formData = new FormData();
      formData.append("file", rawFile);
      const { data } = await uploadExcel(formData);
      if (data.fail) {
        data.message.forEach((item) => {
          this.$message.warning(item);
        });
      } else {
        this.$message.success("导入成功！");
      }
      this.handleClose();
      this.$parent.getAreaList();
      e.stopPropagation();
      e.preventDefault();
    },
    async handleClick(e) {
      const files = e.target.files;
      const rawFile = files[0]; // only use files[0]
      const formData = new FormData();
      formData.append("file", rawFile);
      console.log(rawFile);
      if (!rawFile) return;
      const { data } = await uploadExcel(formData);
      if (data.fail) {
        data.message.forEach((item) => {
          this.$message.warning(item);
        });
      } else {
        this.$message.success("导入成功！");
      }
      this.handleClose();
      this.$parent.getAreaList();
    },
    handleUpload() {
      this.$refs["excel-upload-input"].click();
    },
  },
};
</script>

<style scoped lang="scss">
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 200px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 80px;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
