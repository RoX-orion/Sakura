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
    <upload-file/>
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
import { getToken } from '@/utils/auth'
import UploadFile from '@/components/UploadFile'

export default {
  components: {
    UploadFile
  },
  computed: {
    headers() {
      return {
        'X-token' : getToken()
      }
    }
  },
  methods: {
    beforeUpload() {
      console.log("1111")
    }
  }
}
</script>


<style lang="scss" scoped>
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>

