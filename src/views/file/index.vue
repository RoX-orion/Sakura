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
      <el-col :lg="4" :md="6" :sm="6" :xs="12"
        class="repo"
        v-for="item in fileList" 
        :key="item.url">
        <el-button class="img" @click="detailed(item)">
          <el-image
            class="list"
            :src="item.url">
          </el-image>
        </el-button>
        <div class="filename">{{item.name}}</div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" width="90%" :v-bind="detailedData">
      <el-row :gutter="20">
        <el-col :lg="15">
          <el-image
          :src="detailedData.url">
        </el-image>
        </el-col>
        <el-col :lg="9">
          <div>
            <div class="attribute">文件名: {{detailedData.name}}</div>
            <div class="attribute">文件类型: {{detailedData.mimeType}}</div>
            <div class="attribute">上传时间: {{detailedData.uploadDate}}</div>
            <div class="attribute">文件大小: {{detailedData.fileSize}}</div>
            <div class="attribute">存储位置: {{storagePos}}</div>
            <el-input :value="detailedData.url"></el-input>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
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
      storagePos: '',
      detailedData: {},
      dialogVisible: false,
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
    },
    detailed(data) {
      this.dialogVisible = true
      this.detailedData = data
      if(data.storagePos == 'local'){
        this.storagePos = '本地服务器'
      } else {
        this.storagePos = '对象存储'
      }
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 10px;
  }

  .list {
    width: 150px;
    height: 150px;
    overflow: hidden;
  }

  .img {
    padding: 10px;
  }

  .list:hover {
    box-shadow: rgba(0, 0, 256, 1);
  }

  .filename {
    margin-bottom: 20px;
    /* width: 80%; */
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .attribute {
    margin-bottom: 10px;
  }
</style>

