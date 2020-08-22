<template>
  <div class="system-container">   
    <el-row :gutter="40">
      <el-col :xs="24" :sm="12" style="margin-bottom: 20px">
        <el-card>
          <el-table :data="tableData"  >
            <el-table-column prop="key" label="属性" width="150"></el-table-column>
            <el-table-column prop="value" label="状态" ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- <el-col :xs="0" :sm="2">
        <p></p>
      </el-col> -->
      <el-col :xs="24" :sm="12">
        <el-card v-bind="systemLiveInfo">
          <label>内存</label>
          <el-progress :percentage="memPercentage" :color="customColorMethod"></el-progress>{{usedMem}}/{{totalMem}}<br><br>
          <label>JVM内存</label>
          <el-progress :percentage="jvmPercentage" :color="customColorMethod"></el-progress>{{jvmUsedMem}}/{{jvmTotalMem}}<br><br>
          <label>磁盘</label>
          <el-progress :percentage="diskPercentage" :color="customColorMethod"></el-progress>{{usedDisk}}/{{totalDisk}}<br><br>
          <label>CPU</label>
          <el-progress :percentage="cpuPercentage" :color="customColorMethod"></el-progress>负载:{{systemLoad}}<br><br>
        </el-card>
      </el-col>
    </el-row>
    
    <el-card style="height: 100%" :lineChartData="lineChartData">
      <span style="text-align:center">JVM监控</span>
    </el-card>
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
    <el-row style="margin-bottom:32px; margin-top: 30px">
      <el-col style="margin-bottom: 30px">
        <el-card style="height: 100%" :lineChartData="lineChartData">
          <el-row type="flex" justify="center" style="margin-bottom: 10px">
            <span>CPU使用率</span>
          </el-row>
          <div style="margin-bottom:40px">
            <li>5min</li>
            <li>15min</li>
            <li>30min</li>
          </div>
          <line-chart :chart-data="lineChartData"/>
        </el-card>
      </el-col>

      <el-col style="margin-bottom: 30px">
        <el-card style="height: 100%" :lineChartData="lineChartData">
          <el-row type="flex" justify="center" style="margin-bottom: 10px">
            <span>内存使用率</span>
          </el-row>
          <div style="margin-bottom:40px">
            <li>5min</li>
            <li>15min</li>
            <li>30min</li>
          </div>
          <line-chart :chart-data="lineChartData"/>
        </el-card>
      </el-col>

      <el-col style="margin-bottom: 30px">
        <el-card style="height: 100%" :lineChartData="lineChartData">
          <el-row type="flex" justify="center" style="margin-bottom: 10px">
            <span>带宽使用率</span>
          </el-row>
          <div style="margin-bottom:40px">
            <li>5min</li>
            <li>15min</li>
            <li>30min</li>
          </div>
          <line-chart :chart-data="lineChartData"/>
        </el-card>
      </el-col>

      <el-col :span="24" style="margin-bottom: 30px">
        <el-card style="height: 100%" :lineChartData="lineChartData">
          <el-row type="flex" justify="center" style="margin-bottom: 10px">
            <span>系统平均负载</span>
          </el-row>
          <div style="margin-bottom:40px">
            <li>5min</li>
            <li>15min</li>
            <li>30min</li>
          </div>
          <line-chart :chart-data="lineChartData"/>
        </el-card>
      </el-col>
    </el-row>

    
  </div>
</template>

<script>
import {getSysInfo} from '@/api/system'
import LineChart from './components/LineChart'
import { getToken } from '@/utils/auth'
import { parse } from 'path-to-regexp'

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
      usedMem: 0,
      totalMem: 0,
      memPercentage: 0,

      userUsedCPU: 0,
      sysUsedCPU: 0,
      cpuPercentage:0,
      cpuCount: 0,
      cpuLoad: 0,
      systemLoad: 0,

      jvmPercentage: 0,
      jvmMaxMem: 0,
      jvmTotalMem: 0,
      jvmUsedMem: 0,
      jvmFreeMem: 0,

      diskPercentage: 0,
      totalDisk: 0,
      usedDisk: 0,
      token: getToken(),
      lineChartData: lineChartData,
      tableData: [
        { key: "操作系统版本", value: ""},
        { key: "SpringBoot版本", value: ""},
        { key: "JDK", value: ""},
        { key: "进程ID", value: ""},
        { key: "应用运行时间", value: ""}
      ],
      systemLiveInfo: {}
    }
  },
  created(){
    this.systemInfo(this.token),
    this.handleSetLineChartData("newVisitis"),
    this.initWebSocket()
  },
  destroyed(){
    this.websocket.close()
  },
  methods:{
    customColorMethod(percentage) {
      if (percentage < 80) {
        return '#67c23a';//#6f7ad3蓝  #67c23a绿  #e6a23c橙
      } else {
        return '#DC7633';
      }
    },
    initWebSocket(){
      var websocket
      // const wsuri = "ws://123.56.236.23:8888/websocket"
      const wsuri = "ws://localhost:8888  /websocket"
      this.websocket = new WebSocket(wsuri)
      this.websocket.onmessage = this.websocketonmessage;   
      this.websocket.onopen = this.websocketonopen;        
      this.websocket.onerror = this.websocketonerror;       
      this.websocket.onclose = this.websocketclose;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      var actions = {"test":"12345"};        
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror(){//连接建立失败重连
      // this.initWebSocket();
    },
    websocketonmessage(response){ //数据接收
      const jsonObject = JSON.parse(response.data);
      this.usedMem = jsonObject.usedMem
      this.totalMem = jsonObject.totalMem
      this.memPercentage = parseFloat(jsonObject.memRate)

      this.cpuPercentage = parseFloat(jsonObject.usedCPU)
      this.userUsedCPU = jsonObject.userUsedCPU
      this.sysUsedCPU = jsonObject.sysUsedCPU
      this.cpuCount = jsonObject.cpuCount
      this.cpuLoad = jsonObject.cpuLoad
      this.systemLoad = jsonObject.systemLoad

      this.jvmTotalMem = jsonObject.jvmTotalMem
      this.jvmUsedMem = jsonObject.jvmUsedMem
      this.jvmFreeMem = jsonObject.jvmFreeMem
      this.jvmMaxMem = jsonObject.jvmMaxMem
      this.jvmPercentage = parseFloat(jsonObject.jvmMemRate)

      this.totalDisk = jsonObject.totalDisk
      this.usedDisk = jsonObject.usedDisk
      this.diskPercentage = parseFloat(jsonObject.diskRate)
      console.log(jsonObject.usedMem)
    },
    websocketsend(Data){//数据发送
      this.websocket.send(Data);
    },
    websocketclose(){  //关闭
      console.log('断开连接');
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },

    systemInfo(token){
      // var _this = this
      getSysInfo(token).then( response => {
      // console.log(token)
        this.tableData[0].value = response.osName
        this.tableData[1].value = response.SpringBootVersion
        this.tableData[2].value = response.javaVendor + " " + response.javaVersion
        // this.tableData[3].value = response.javaVmName + " " + response.javaVmVersion
      });
    }
  }
};
</script>

<style scoped>
  .system-container{
    margin: 15px;
  }

  ul {
    display: block;
  }

  li{
    display: block;
    float: left;
    width: 50px;
    height: 20px;
    border-radius: 5px;
    background-color: #409eff;
    text-align: center;
    cursor: pointer;
    margin-left: 40px;
    list-style:none;
  }
</style>
