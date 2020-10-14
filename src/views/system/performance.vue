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
      <el-col :xs="24" :sm="12" style="margin-bottom: 20px">
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
    
    <el-row :gutter="40">
      <el-col :lg="12">
        <el-card style="height: 100%; margin-bottom: 20px">
          <div style="font-size: 20px;">进程</div>
          <hr>
          <el-table :data="processTableData" style="width: 100%">
            <el-table-column prop="processPID" width="90" label="进程PID"></el-table-column>
            <el-table-column prop="processUptime" width="180" label="运行时间"></el-table-column>
            <el-table-column prop="processCpuUsed" label="进程CPU使用率"></el-table-column>
            <el-table-column prop="cpuCount" label="CPU核心数"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :lg="12">
        <el-card style="height: 100%">
          <div style="font-size: 20px;">线程</div>
          <hr>
          <el-table :data="threadTableData" style="width: 100%">
            <el-table-column prop="activeThread" label="活动线程"></el-table-column>
            <el-table-column prop="daemonsProcess" label="守护进程"></el-table-column>
            <el-table-column prop="maxThread" label="线程峰值"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
    <el-row style="margin-bottom:32px; margin-top: 30px" class="resource">
      <el-col style="margin-bottom: 30px">
        <el-card style="height: 100%">
          <el-row type="flex" justify="center" style="margin-bottom: 10px">
            <span>CPU使用率</span>
          </el-row>
          <div style="margin-bottom:40px" class="time">
            <li>5min</li>
            <li>15min</li>
            <li>30min</li>
          </div>
          <CPULineChart :chart-data="CPUlineChartData" :xData="xAxis" />
        </el-card>
      </el-col>

      <el-col style="margin-bottom: 30px">
        <el-card style="height: 100%">
          <el-row type="flex" justify="center" style="margin-bottom: 10px">
            <span>内存使用率</span>
          </el-row>
          <div style="margin-bottom:40px" class="time">
            <li>5min</li>
            <li>15min</li>
            <li>30min</li>
          </div>
          <mem-line-chart :chart-data="MemLineChartData" :xData="xAxis"/>
        </el-card>
      </el-col>

      <!--<el-col style="margin-bottom: 30px">
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
      </el-col>-->
    </el-row>

    
  </div>
</template>

<script>
import { getSysInfo, getDatabaseLiveInfo, getProcessInfo, getThreadInfo } from '@/api/getInformation'
import CPULineChart from './components/CPULineChart'
import MemLineChart from './components/MemLineChart'
import { getToken } from '@/utils/auth'
import { parse } from 'path-to-regexp'
import { sendWebsocket, closeWebsocket, initWebSocket } from '@/utils/websocket'

const lineChartData = {
  cpu: {
    time: new Date(),
    usedCPU: [0],
    sysUsedCPU: [],
    userUsedCPU: []
  },
  mem: {
    time: new Date(),
    usedMem: [],
    totalMem: []
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
    CPULineChart,
    MemLineChart
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

      process: {},
      thread: {},
      token: getToken(),
      CPUlineChartData: lineChartData.cpu,
      MemLineChartData: lineChartData.mem,
      tableData: [
        { key: "操作系统版本", value: ""},
        { key: "SpringBoot版本", value: ""},
        { key: "JDK", value: ""},
        { key: "系统启动时间", value: ""},
        { key: "进程启动时间", value: ""}
      ],
      intervalId: '',
      systemLiveInfo: {},
      xAxis: [],
      processTableData: [],
      threadTableData: [],
    }
  },
  created(){
    this.systemInfo(this.token),
    this.requstWs(),
    this.getEchartsData(),
    this.echartIintervalId = setInterval(this.getEchartsData, 1000 * 60 * 5)
    this.getThreadInfo(),
    this.threadInfoId = setInterval(this.getThreadInfo, 1000 * 60)
  },
  destroyed(){
    closeWebsocket(),
    clearInterval(this.echartIintervalId)
    clearInterval(this.threadInfoId)
  },
  methods:{
    getThreadInfo(){
      getThreadInfo().then(response => {
        const data = response.data
        this.thread.activeThread = data.activeThread
        this.thread.daemonsProcess = data.daemonsProcess
        this.thread.maxThread = data.maxThread
        this.threadTableData.pop()
        this.threadTableData.push(this.thread)
      })
    },
    getEchartsData() {
      const id = "abc"
      getDatabaseLiveInfo({id}).then(response => {
        const data = response.data
        var i
        var j = 0;
        for(i = data.length - 1; i>=0; i--){
          this.xAxis[j] = data[i].date
          this.CPUlineChartData.sysUsedCPU[j] = data[i].sysUsedCPU
          this.CPUlineChartData.userUsedCPU[j] = data[i].userUsedCPU
          this.CPUlineChartData.usedCPU[j] = data[i].usedCPU
          this.MemLineChartData.usedMem[j] = data[i].usedMem.substr(0, data[i].usedMem.length - 2)
          this.MemLineChartData.totalMem[j] = data[i].totalMem
          j++
        }
        this.CPUlineChartData.time = new Date()
        this.MemLineChartData.time = new Date()
      })
    },
    customColorMethod(percentage) {
      if (percentage < 80) {
        return '#67c23a' //#6f7ad3蓝  #67c23a绿  #e6a23c橙
      } else {
        return '#DC7633'
      }
    },
    wsMessage (data) {
      const jsonObject = data
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

      this.process.processCpuUsed = jsonObject.processCpuUsed + '%'
      const time = jsonObject.processUptime.split('.')
      const uptime = time[0] + '天' + time[1] + '小时' + time[2] + '分钟' + time[3] + '秒'

      this.process.cpuCount = jsonObject.cpuCount
      this.process.processPID = jsonObject.processPID

      this.process.processUptime = uptime
      this.processTableData.pop()
      this.processTableData.push(this.process)
    },
    wsError () {
      initWebSocket()
    },
    requstWs () {
      // 防止用户多次连续点击发起请求，所以要先关闭上次的ws请求。
      closeWebsocket()
      const obj = {
        monitorUrl: 'xxxxxxxxxxxxx',
        userName: 'xxxxxxxxxx'
      }
      // sendWebsocket('ws://123.56.236.23:8888/liveInfo/555', obj, this.wsMessage, this.wsError)
      sendWebsocket('ws://localhost:8888/liveInfo/555', obj, this.wsMessage, this.wsError)
    },
    systemInfo(token){
      getSysInfo(token).then( response => {
        this.tableData[0].value = response.osName
        this.tableData[1].value = response.SpringBootVersion
        this.tableData[2].value = response.javaVendor + " " + response.javaVersion
        this.tableData[3].value = response.systemStartTime
        this.tableData[4].value = response.processStartTime
      });
    }
  }
};
</script>

<style scoped>
  .cpu{
    padding-left: 0;
  }
  .system-container{
    margin: 15px;
  }
/* 
  ul {
    display: block;
  } */

  .time li{
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

  .process li{
    /* width: 120px; */
    margin-right: 20px;
    display: block;
    float: left;
    list-style:none;
  }
</style>

<style>
  .resource .el-card__body{
    padding-left: 0;
    padding-right: 0;
  }
</style>