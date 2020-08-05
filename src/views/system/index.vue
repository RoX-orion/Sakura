<template>
  <div class="system-container">   
    <el-row>
      <el-col :xs="24" :sm="11" style="margin-bottom: 20px">
        <el-card>
          <el-table :data="tableData" border >
            <el-table-column prop="key" label="属性" ></el-table-column>
            <el-table-column prop="value" label="状态" ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :xs="0" :sm="2">
        <p></p>
      </el-col>
      <el-col :xs="24" :sm="11">
        <el-card>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="key" label="属性" ></el-table-column>
            <el-table-column prop="value" label="状态" ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
    <el-row style="margin-bottom:32px; margin-top: 30px">
      <el-col :span="24">
        <el-card style="height: 100%" :lineChartData="lineChartData">
          <line-chart :chart-data="lineChartData"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getSysInfo} from '@/api/system'
import LineChart from './components/LineChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  components: {
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData,
      tableData: [
        { key: "操作系统版本", value: ""},
        { key: "SpringBoot版本", value: ""},
        { key: "JDK", value: ""},
        { key: "JVM", value: ""}
      ]
    }
  },
  created(){
    this.systemInfo(),
    this.handleSetLineChartData("newVisitis")
  },
  methods:{
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },

    systemInfo(){
      // var _this = this
      getSysInfo().then( response => {
      // console.log(response)
        this.tableData[0].value = response.osName + " " + response.osArch
        this.tableData[1].value = response.SpringBootVersion
        this.tableData[2].value = response.javaVendor + " " + response.javaVersion
        this.tableData[3].value = response.javaVmName + " " + response.javaVmVersion
      });
    }
  }
};
</script>

<style scoped>
  .system-container{
    margin: 15px;
  }
</style>
