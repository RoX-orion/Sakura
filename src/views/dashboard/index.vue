<template>
  <div class="dashboard-container">
    <el-card style="margin-bottom: 40px">
      <span>我始终坚持的精神：Open Source, Open Mind, Open Sight, Open Future!</span>
    </el-card>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="new-visitor" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              新访客
            </div>
            <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="new-visit" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              新浏览量
            </div>
            <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="total-visitor" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              总访客
            </div>
            <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="look" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              总浏览量
            </div>
            <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-bottom:32px; margin-top: 30px">
      <el-col :span="24">
        <el-card style="height: 100%" :lineChartData="lineChartData" class="card">
          <line-chart :chart-data="lineChartData"/>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :md="12" :lg="12">
        <el-card class="china-map">
          <china-map></china-map>
        </el-card>
      </el-col>

      <el-col :xs="24" :md="12" :lg="12">
        <el-card>
          <div align="center" style="margin-bottom: 15px"><b>如果您觉得此项目对您有帮助，可以请作者喝杯咖啡</b></div>
          <el-row>
            <el-col :xs="24" :sm="12" align="center">
              <div>Alipay</div>
              <img src="@/assets/img/Alipay.jpg" style="width: 200px; height: 200px"/>
            </el-col>
            <el-col :xs="24" :sm="12"  align="center">
              <div>WeChat</div>
              <img src="@/assets/img/WeChat.png" style="width: 200px; height: 200px"/>     
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col>

      </el-col>
    </el-row>
    

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CountTo from 'vue-count-to'
import LineChart from './components/LineChart'
import ChinaMap from './components/ChinaMap'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165, 12, 45, 25, 46, 28, 79, 462, 256, 123],
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
  name: 'Dashboard',
  data() {
    return {
      drawer: false,
      lineChartData: lineChartData.newVisitis
    }
  },
  components: {
    CountTo,
    LineChart,
    ChinaMap
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  // created() {
  //   this.handleSetLineChartData(type)
  // },
  methods: {
    handleSetLineChartData(type) {
      // this.$emit('handleSetLineChartData', type)
      this.lineChartData = lineChartData[type]
    },
    //  handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // },
    // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    &:hover{
      box-shadow: 4px 4px 40px rgba(8, 8, 8, 0.2);
    }
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .12);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

  .dashboard {
    &-container {
      margin: 15px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>

<style scoped>
  .china-map{
    margin-bottom: 20px;
  }
</style>
