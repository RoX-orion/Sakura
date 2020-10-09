<template>
  <div class="container">
    <el-card>
      <el-upload
        class="upload-demo"
        drag
        action="api/uploadFile"
        :headers="headers"
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
  computed: {
    headers() {
      return {
        'X-token' : getToken()
      }
    }
  },
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