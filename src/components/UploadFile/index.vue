<template>
  <div class="container">
    <el-card>
      <el-upload
        class="upload-demo"
        drag
        action="api/uploadFile"
        ref="upload"
        :file-list="fileList"
        :http-request="upload"
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
import { uploadFile } from '@/api/upload'

export default {
  name: 'UploadFile',
  data() {
    return {
      fileList: [],
    }
  },
  methods: {
    upload(param) {
      const data = new FormData()
      data.append('file', param.file)
      uploadFile(data).then(response =>{
        const code = response.code
        if(code == 200){
          this.$message({
            message: '文件上传成功！',
            center:true,
            showClose: true,
            type: 'success'
          })
          this.$refs['upload'].clearFiles()
        }
      })
    },
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