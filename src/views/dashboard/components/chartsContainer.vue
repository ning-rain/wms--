<template>

  <div :id="id" class="main" />

</template>

<script>
import * as echarts from 'echarts'

export default {
  props: {
    option: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: String,
      default: 'box'
    }
  },
  watch: {
    option: {
      handler(val) {
        this.setCharts(val)
      }
    }
  },
  mounted() {
    this.setCharts({})
  },
  methods: {
    setCharts(option) {
      var myChart = echarts.init(document.getElementById(this.id))
      // 绘制图表
      myChart.setOption(option)
    }
  }

}
</script>

<style>
.main{
  height: 100%;
  width:100%;
}
</style>
