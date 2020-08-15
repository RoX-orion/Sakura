<template>
  <div class="backToTop-container">
    <div v-for="n in 100" :key="n">
        {{n}}
    </div>
  </div>
</template>

<style scoped>
  .backToTop-container{
    text-align: center;
  }
</style>
