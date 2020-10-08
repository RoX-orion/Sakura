<template>
  <mavon-editor 
  class="mavon-editor" 
  :boxShadowStyle="boxShadowStyle"
  @imgAdd="imgAdd"
  @imgDel="imgDel"/>
</template>

<script>
import { savePost } from '@/api/article'

export default {
  data() {
    return {
      isChange: false,
      boxShadowStyle: '0 2px 12px 0 rgba(0, 0, 0, 0.2)',
      state: 0,
    }
  },
  methods: {
    changePost(){
      this.isChange = true
    },
    savePost(value, render, state) { // value = MarkDown format; render = HTML format, image will change to base64
      if(this.isChange == true) {
        const text = value
        console.log(this.state)
        savePost({text}).then(response => {
          const code = response.code
          if(code == 200){
            this.$message({
              message: '保存成功！',
              type: 'success',
              showClose: true,
              center: true
            })
          }
        })
        this.isChange = false
      }
    },
    imgAdd(filename, file) {

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
</style>