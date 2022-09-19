<template>
  <div>
    <SearchCard :config="setForm" @getFormData="searchData" @reset="getList" />
    <Table
      :thead="tableLabel"
      :tableDate="tableData"
      :total="total"
      @changeSize="changeSize"
      @changePage="changePage"
    >
      <!-- @changeSize="changeSize"
      @changePage="changePage" -->
      <template #btn>
        <el-button round @click="openAddDialog">新增货品类型</el-button>
      </template>
      <template #operate="{ scoped: { row } }">
        <span class="operate-btn" @click="editWareHouse(row)">编辑</span>
        <span class="operate-btn" @click="delWareHouse(row)">删除</span>
      </template>
    </Table>
    <DiaLog
      :diaLogVisible.sync="dialogVisible"
      v-if="dialogVisible"
      :info="info"
      :dialogType="dialogType"
    />
  </div>
</template>

<script>
import { getGoodsTypeList, delGoodsType } from "@/api/manageBaseInfo";
import DiaLog from "./components/DiaLog";
export default {
  data() {
    return {
      setForm: [
        { label: "类型编号", prop: "like_code" },
        { label: "类型名称", prop: "like_name" },
      ],
      tableLabel: [
        { prop: "code", label: "货品类型编码" },
        { prop: "name", label: "货品类型名称" },
        { prop: "createTime", label: "更新时间" },
        {
          label: "操作",
          slotName: "operate",
        },
      ],
      tableData: [],
      total: "",
      dialogVisible: false,
      pageSize: "",
      info: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    searchData(form) {
      this.getList(1, 10, form);
    },
    async getList(current = 1, size = 10, form) {
      const { data } = await getGoodsTypeList({ current, size, ...form });
      this.tableData = data.records;
      this.pageSize = data.size;
      this.total = parseInt(data.total);
    },
    openAddDialog() {
      this.dialogType = "add";
      this.dialogVisible = true;
    },
    changeSize(val) {
      this.pageSize = val;
      this.getList(1, val);
    },
    changePage(val) {
      this.getList(val, this.pageSize);
    },
    editWareHouse(row) {
      this.info = row;
      this.dialogType = "edit";
      this.dialogVisible = true;
    },
    async delWareHouse(row) {
      this.$confirm(`确定要删除：${row.name} 吗？`, `确定删除`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await delGoodsType({ ids: [row.id] });
          this.getList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  components: {
    DiaLog,
  },
};
</script>

<style>
.operate-btn {
  font-size: 13px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #ffb200;
  cursor: pointer;
  border-color: transparent;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
  outline: 0;
  margin-left: 8px;
  margin-right: 8px;
}
</style>
