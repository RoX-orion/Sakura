<template>
  <mavon-editor 
  class="mavon-editor v-note-wrapper" 
  :boxShadowStyle="boxShadowStyle"
  ref=md
  v-model="input"
  @change="changePost"
  @save="savePost"
  @imgAdd="imgAdd"
  @imgDel="imgDel"/>
</template>

<script>
import { savePost, addPost } from '@/api/article'
import { uploadFile } from '@/api/file'

export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isChange: false,
      boxShadowStyle: '0 2px 12px 0 rgba(0, 0, 0, 0.2)',
      state: 0,
      md: '',
      html: '',
      input: 'MarkDown编辑器插入图片样式无解，别用了'
    }
  },
  methods: {
    changePost(){
      this.isChange = true
    },
    savePost(value, render) { // value = MarkDown format; render = HTML format
      if(this.isChange == true) {
        if(this.title != ''){
          const content = render
          const title = this.title
          this.html = render
          savePost({content, title}).then(response => {
            const code = response.code
            if(code == 200){
              this.$message({
                message: '保存成功！',
                type: 'success',
                showClose: true,
                center: true
              })
              this.isChange = false
            }
          })
        } else {
          this.$message({
            message: '请输入文章标题！',
            type: 'warning',
            showClose: true,
            center: true
          })
        }
      }
    },
    addPost() {
      if(this.isChange == false && this.html != '') {
        const content = this.html
        const title = this.title
        addPost({content, title}).then(response => {
          const code = response.code
          if(code == 200){
            this.$message({
              message: '发布成功！',
              type: 'success',
              showClose: true,
              center: true
            })
          }
        })
      } else {
        this.$message({
          message: '请先保存文档！',
          type: 'warning',
          showClose: true,
          center: true
        })
      }
    },
    imgAdd(filename, file) {
      const data = new FormData();
      data.append('file', file);
      uploadFile(data).then(response => {
        const code = response.code
        const url = response.data.url
        if(code == 200){
          this.$refs.md.$img2Url(filename, url)
        }
      })
    },
    imgDel(filename) {

    },
    addImgFromRepo(name, url) {
      const img = '![' + name + '](' + url + ')'
      this.input += img
    }
  }
}
</script>

<style scoped>
  .mavon-editor {
    height: 650px;
  }

  .v-note-wrapper {
    position: inherit;
  }
</style>