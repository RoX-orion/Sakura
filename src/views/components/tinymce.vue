<template>
  <div class="components-container" >
    <div >
      <tinymce v-model="content" :height="500" />
    </div>
    <!-- <div class="editor-content" v-html="content" /> -->
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content: ''
      
    }
  }
}
</script>

<style scoped>
  .components-container{
    margin: 30px;
  }
  .editor-content{
    margin-top: 20px;
  }
</style>

