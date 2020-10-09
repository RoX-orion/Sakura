<template>
  <div class="container">
    <el-card>
      <el-upload
        class="upload-demo"
        drag
        action="api/uploadFile"
        :headers="headers"
        :file-list="fileList"
        :on-success="uploadSuccess"
        ref="upload"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </el-card>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'UploadFile',
  data() {
    return {
      fileList: []
    }
  },
  computed: {
    headers() {
      return {
        'X-token' : getToken()
      }
    }
  },
  methods: {
    uploadSuccess() {
      this.$refs['upload'].clearFiles()
    },
    upload() {
      console.log(this.fileList)
    },
    clearFiles() {
      
    }
  }
}
</script>

<style>
  .el-upload {
    width: 100%;
  }
  .disabled .el-upload-dragger {
      display: none;
  }
  .el-upload-dragger {
    width: 100%;
  }
</style>