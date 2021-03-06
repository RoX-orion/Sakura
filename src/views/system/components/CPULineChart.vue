<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  name: "CPULineChart",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      required: true
    },
    xData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    chartData: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.setOptions(newVal);
          } else {
            this.setOptions(oldVal);
          }
        } else {
            this.initChart();
        }
      },
      deep: true //对象内部属性的监听，关键。
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData, true);
      window.addEventListener("resize", this.chart.resize);
    },
    setOptions({ usedCPU, sysUsedCPU, userUsedCPU } = {}, x) {
      this.chart.setOption({
        dataZoom: [
            {
              type: 'slider',
              show: true,
              realtime: true,
              start: 0,
              end: 144
            },
            // {
            //   type: 'inside',
            //   realtime: true,
            //   start: 65,
            //   end: 85
            // }
        ],
        xAxis: {
          data: this.xData,
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          axisTick: {
            show: false,
          },
          type : 'value',
          // max: 100,
          axisLabel:{formatter:'{value}%'}
        },
        legend: {
          data: ['总使用率', '系统', '用户'],
        },
        series: [
          {
            name: '总使用率',
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2,
                },
              },
            },
            smooth: true,
            type: "line",
            data: usedCPU,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
          {
            name: '系统',
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: sysUsedCPU,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
          {
            name: '用户',
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#67c23a",
                lineStyle: {
                  color: "#67c23a",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: userUsedCPU,
            animationDuration: 2000,
            animationEasing: "quadraticOut",
          }
        ]
      })
    }
  }
}
</script>
