<template>
  <div class="container">
    <!-- <el-drawer
      title="上传文件"
      :visible.sync="drawer"
      :direction="direction"
      >
      <div>
        <upload-file/>
      </div>
    </el-drawer>
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="medium" @click="drawer = true">上传文件<i class="el-icon-upload el-icon--right"></i></el-button>
      <el-button type="danger" size="medium">删除文件<svg-icon icon-class="delete"></svg-icon></el-button>
      <el-button type="success" size="medium">下载文件<svg-icon icon-class="download"></svg-icon></el-button>
    </div> -->
    <el-tabs v-model="active">
      <el-tab-pane label="选择媒体" name="select">
        <el-row :gutter="30">
          <el-col :lg="7" v-bind="detailedData" class="detailed-data">
            <div v-if="detailedData.url != null">
              <el-image class="detailed-img" :src="detailedData.url"></el-image>
              <el-button type="primary" style="float: right">插入至文章</el-button>
              <div class="attribute">文件名: {{detailedData.name}}</div>
              <div class="attribute">文件类型: {{detailedData.mimeType}}</div>
              <div class="attribute">上传时间: {{detailedData.uploadDate}}</div>
              <div class="attribute">文件大小: {{detailedData.fileSize}}</div>
              <div class="attribute">存储位置: {{storagePos}}</div>
              <el-input :value="detailedData.url"></el-input>
            </div>
          </el-col>
          <el-col :lg="17" :md="17" :sm="17" :xs="24" class="repo">
            <el-row>
              <el-col :lg="6" :md="8" :sm="12" v-for="item in fileList" :key="item.url">
                <el-button class="img" @click="detailed(item)">
                  <el-image
                    class="list"
                    :src="item.url">
                  </el-image>
                </el-button>
                <div class="filename">{{item.name}}</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传文件" name="upload">
        <upload-file @uploadSuccess="success"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UploadFile from '@/components/UploadFile'
import { getFileList } from '@/api/file'

export default {
  name: 'SelectFile',
  components: {
    UploadFile
  },
  data() {
    return {
      active: 'select',
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
    },
    success(value) {
      for(let i = this.fileList.length; i>=0; i--){
        this.fileList[i] = this.fileList[i-1];
      }
      this.fileList[0] = value
      this.active = 'select'
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 10px;
  }

  .detailed-data {
    border: rgba(0, 0, 0, .5) solid 3px;
    padding: 10px;
    height: 500px;
    margin-bottom: 20px;
  }

  .detailed-img {
    width: 50%;
    margin-bottom: 20px;
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
    /* text-align: center; */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .attribute {
    margin-bottom: 10px;
  }

  .repo {
    height: 500px;
    overflow-y: scroll;
  }
</style>
