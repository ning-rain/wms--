<template>
  <div class="unfold">
    <el-collapse>
      <el-collapse-item title="基础信息">
        <el-steps :active="1" finish-status="success" class="Timeline">
          <el-step title="新建" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="已取消" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
        <div class="specificInformation">
          <div class="specificInformation1">
            <div class="specificIn">
              <span>入库单号</span>
              <p>{{basicInformation.code}}</p>
            </div>
          </div>
          <div class="specificInformation2">
            <div class="specificIn1">
              <span>创建时间</span>
              <p>{{basicInformation.createTime}}</p>
            </div>
          </div>
          <div class="specificInformation3">
            <div class="specificIn2">
              <span>计划到达时间</span>
              <p>{{basicInformation.planArrivalTime}}</p>
            </div>
          </div>
          <div class="specificInformation4">
            <div class="specificIn3">
              <span>仓库名称</span>
              <p>{{basicInformation.warehouseName}}</p>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basicInformation: {
        code: '2',
        createTime: '3',
        planArrivalTime: '4',
        warehouseName: '5',
      },
    }
  },
  created() {
    console.log(this.$route)
  },
}
</script>

<style lang="scss">
.unfold {
  .el-collapse-item {
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    margin-bottom: 25px;
    padding: 14px 27px 15px;
  }
  .el-collapse-item__wrap {
    padding-top: 30px;
  }
  .Timeline {
    padding-left: 15%;
    padding-right: 15%;
  }
  .specificInformation {
    display: flex;
    margin-top: 50px;
    width: 100%;
    height: 100px;
    background-color: #fffdf6;
    align-items: center;

    .specificInformation1 {
      width: 150px;
      height: 80px;
      // background-color: pink;
      margin-left: 40px;
    }
    .specificInformation2 {
      width: 150px;
      height: 80px;
      // background-color: pink;
      margin-left: 100px;
    }
    .specificInformation3 {
      width: 150px;
      height: 80px;
      // background-color: pink;
      margin-left: 100px;
    }
    .specificInformation4 {
      width: 150px;
      height: 80px;
      // background-color: pink;
      margin-left: 100px;
    }
    .specificIn,
    .specificIn1,
    .specificIn2,
    .specificIn3 {
      margin-top: 10px;
      width: 100px;
      height: 80px;
      span {
        color: #887e7e;
      }
    }
  }
}
</style>