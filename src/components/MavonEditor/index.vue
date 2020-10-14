<template>
  <mavon-editor 
  class="mavon-editor v-note-wrapper" 
  :boxShadowStyle="boxShadowStyle"
  ref=md
  @change="changePost"
  @save="savePost"
  @imgAdd="imgAdd"
  @imgDel="imgDel"/>
</template>

<script>
import { savePost, addPost } from '@/api/article'
import { uploadFile } from '@/api/upload'

export default {
  data() {
    return {
      isChange: false,
      boxShadowStyle: '0 2px 12px 0 rgba(0, 0, 0, 0.2)',
      state: 0,
      md: '',
      html: '',
    }
  },
  methods: {
    changePost(){
      this.isChange = true
    },
    savePost(value, render) { // value = MarkDown format; render = HTML format, image will change to base64
      console.log(render)
      if(this.isChange == true) {
        const text = render
        this.html = render
        savePost({text}).then(response => {
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
      }
    },
    addPost() {
      if(this.isChange == true) {
        const data = this.html
        addPost(data).then(response => {
          const code = response.code
          if(code == 200){
            this.$message({
              message: '发布成功！',
              type: 'success',
              showClose: true,
              center: true
            })
            this.isChange = false
          }
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