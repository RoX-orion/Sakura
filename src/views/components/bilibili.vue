<template>
  <div class="bilibili-container cruise-video">
    <el-card style="margin-bottom: 30px">
      Bilibili flv.js播放器，<a href="https://github.com/Bilibili/flv.js/" target="_blank"><b style="color:blue">项目地址</b></a>
    </el-card>
    <el-row>
      <el-col :lg="16">
        <div class="video">
          <video id="videoId" controls="true" height="100%" width="100%" muted object-fit: fill></video>
        </div>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import flvjs from "flv.js"
import { bilibili } from '@/api/media'
export default {
  data() {
    return {
      url: ''
    }
  },
  created() {
    // this.init();
  },
  mounted() {
    if (flvjs.isSupported()) {
      let videoElement = document.getElementById("videoId");
      let flvPlayer = flvjs.createPlayer({
        type: "flv",
        // isLive: false,
        // enableWorker: true,
        // enableStashBuffer: false,
        // stashInitialSize: 128,
        hasAudio: true,
        url: 'http://localhost:8888/static/video/nuclear.flv',
      });
      console.log(flvPlayer, "flv对象");
      flvPlayer.attachMediaElement(videoId);
      flvPlayer.load();
      flvPlayer.play();
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .bilibili-container{
    margin: 15px;
  }
  .video{
    width:100%;
    background: #000;
    position:relative;
    padding-bottom:56.25%;    /*需要用padding来维持16:9比例,也就是9除以16*/
    height: 0;
  }
  .video video{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%
  }
</style>
