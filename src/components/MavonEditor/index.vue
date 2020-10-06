<template>
  <mavon-editor class="mavon-editor" :boxShadowStyle="boxShadowStyle" @save="saveDoc"/>
</template>

<script>


export default {
  data() {
    return {
      boxShadowStyle: '0 2px 12px 0 rgba(0, 0, 0, 0.2)'
    }
  },
  methods: {
    saveDoc(value, render) {
      console.log(render)
    }
  }
}
</script>

<style scoped>
  .mavon-editor {
    height: 650px;
  }
</style>