<template>
  <div class="container">
    <el-drawer
      title="上传文件"
      :visible.sync="drawer"
      :direction="direction"
      >
      <div>
        <upload-file/>
      </div>
    </el-drawer>
    
    <el-row :gutter="30">
      <el-col :lg="24">
        <div style="margin-bottom: 20px">
          <el-button type="primary" size="medium" @click="drawer = true">上传文件<i class="el-icon-upload el-icon--right"></i></el-button>
          <el-button type="danger" size="medium">删除文件<svg-icon icon-class="delete"></svg-icon></el-button>
          <el-button type="success" size="medium">下载文件<svg-icon icon-class="download"></svg-icon></el-button>
        </div>
      </el-col>
      <el-col :lg="4" v-for="item in fileList" 
          :key="item.url">
        <el-image
          class="list"
          
          :src="item.url">
        </el-image>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UploadFile from '@/components/UploadFile'
import { getFileList } from '@/api/file'

export default {
  components: {
    UploadFile
  },
  data() {
    return {
      lazy: true,
      fileList: [],
      drawer: false,
      direction: 'rtl',
    }
  },
  created() {
    this.getFileList()
  },
  methods: {
    getFileList() {
      getFileList().then(request => {
        const data = request.data
        const code = request.code
        if(code == 200){
          this.fileList = data.list
        }
      })
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 10px;
  }

  .list {
    width: 200px;
    height: 200px;
    overflow: hidden;
  }
</style>

