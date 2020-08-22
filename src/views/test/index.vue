<!--<template>
	<div>
		<p>{{ data }}</p>
		<p>{{ token }}</p>
		<p>{{ avatar }}</p>
		<el-button type="primary" @click="func">测试</el-button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { test } from '@/api/system'

export default {
	name: 'Dashboard',
	data() {
		return {
			data: ''
		}
	},
  computed: {
    ...mapGetters([
			'name',
			'token',
			'avatar'
    ])
  },
  methods: {
    func() {
      test().then( response => {
				console.log(response.data)
			});
    },
  },
};
</script>-->





<!--<template>
  <div class="components-container">
    <pan-thumb :image="image" />

    <el-button type="primary" icon="el-icon-upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">
      更换头像
    </el-button>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://httpbin.org/post"
      lang-type="zh"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
    <el-button type="primary" @click="test"></el-button>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import {test} from '@/api/system'

export default {
  name: 'AvatarUploadDemo',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    }
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    },
    test(){
      test().then(response =>{
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>-->


<template>
  <div class="echarts">
    <!-- <div :style="{height:'400px',width:'100%'}" ref="myEchart"></div> -->
    <div style="font-size: 20px; margin-bottom: 10px">JVM监控</div>
    <el-row :gutter="20">
      <el-col :lg="6">
        <el-card style="height: 100%" class="gc">
          <span style="margin-bottom: 15px; display:block; font-size: 20px; color:black">JVM GC </span>
          <span>20</span> 次
          <div>系统GC次数</div>
          <span>20</span> s
          <div>GC总耗时</div>
          <span>20</span> s
          <div>GC最大耗时</div>
        </el-card>
      </el-col>

      <el-col :lg="6">
        <el-card style="height: 100%">
          <div>JVM GC </div>
        </el-card>
      </el-col>

      <el-col :lg="6">
        <el-card style="height: 100%">
          <div>JVM GC </div>
        </el-card>
      </el-col>

      <el-col :lg="6">
        <el-card style="height: 100%">
          <div>JVM GC </div>
        </el-card>
      </el-col>
    </el-row>
    
  </div>
</template>

<style>
  .echarts{
    margin: 15px;
  }

  .gc div{
    margin-bottom: 20px;
    margin-top: 5px;
  }

  .gc span{
    color: #9ecdfa;
    font-size: 20px;
  }

  .gc div{
    color: grey;
  }
</style>

<script>
import echarts from "echarts";
import "echarts/map/js/china.js";

export default {
  name: "ChinaMap",
  props: ["userJson"],
    data() {
      return {
        chart: null
      };
    },
    mounted() {
      this.chinaConfigure();
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      chinaConfigure() {
        console.log(this.userJson)
        let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置    
        window.onresize = myChart.resize;
        myChart.setOption({ // 进行相关配置
          backgroundColor: "#02AFDB",
          tooltip: {}, // 鼠标移到图里面的浮动提示框
          dataRange: {
            show: false,
            min: 0,
            max: 1000,
            text: ['High', 'Low'],
            realtime: true,
            calculable: true,
            color: ['orangered', 'yellow', 'lightskyblue']
          },
          geo: { // 这个是重点配置区
            map: 'china', // 表示中国地图
            roam: true,
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0,0.4)'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [{
              type: 'scatter',
              coordinateSystem: 'geo' // 对应上方配置
            },
            {
              name: '启动次数', // 浮动框的标题
              type: 'map',
              geoIndex: 0,
              data: [{
                "name": "北京",
                "value": 599
              }, {
                "name": "上海",
                "value": 142
              }, {
                "name": "黑龙江",
                "value": 44
              }, {
                "name": "深圳",
                "value": 92
              }, {
                "name": "湖北",
                "value": 810
              }, {
                "name": "四川",
                "value": 453
              }]
            }
          ]
        })
      }
    }
}
</script>

