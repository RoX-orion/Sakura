<template>
  <div class="container">
    <mavon-editor/>
  </div>
</template>

<script>
import MavonEditor from '@/components/MavonEditor'

export default {
  components: {
    MavonEditor
  }
}
</script>

<style lang="scss" scoped>
  .container {
    margin: 15px;
  }
</style>