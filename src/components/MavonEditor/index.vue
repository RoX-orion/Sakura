<template>
  <mavon-editor 
  class="mavon-editor" 
  :boxShadowStyle="boxShadowStyle" 
  @save="saveDoc"
  @change="changeDoc"/>
</template>

<script>
import { saveArticle } from '@/api/article'

export default {
  data() {
    return {
      isChange: false,
      boxShadowStyle: '0 2px 12px 0 rgba(0, 0, 0, 0.2)'
    }
  },
  methods: {
    changeDoc(){
      this.isChange = true
    },
    saveDoc(value, render) {
      if(this.isChange == true){
        const text = value
        saveArticle({text}).then(response => {
          
        })
        console.log('value = \n' + value)
        console.log('render = \n' + render)
        this.isChange = false
      }
    }
  }
}
</script>

<style scoped>
  .mavon-editor {
    height: 650px;
  }
</style>