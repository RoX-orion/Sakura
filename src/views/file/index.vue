<template>
  <div class="container">
    <upload-file/>
  </div>
</template>

<script>
import UploadFile from '@/components/UploadFile'

export default {
  components: {
    UploadFile
  }
}
</script>

<style scoped>
  .container {
    margin: 10px;
  }
</style>

