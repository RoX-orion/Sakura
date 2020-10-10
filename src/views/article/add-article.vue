<template>
  <div class="container">
    <el-card class="head-card">
      <el-page-header @back="goBack" content="编辑文章">
      </el-page-header>
      <el-input
      class="title-input"
      placeholder="请输入文章标题">
      </el-input>
      <el-dropdown @command="select">
        <el-button type="primary">
          切换编辑器<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="rte">富文本编辑器</el-dropdown-item>
          <el-dropdown-item command="markdown">MarkDown编辑器</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-card>
    <mavon-editor :v-if="markdown"/>
    <tinymce :v-if="rte"></tinymce>
  </div>
</template>

<script>
import MavonEditor from '@/components/MavonEditor'
import Tinymce from '@/components/Tinymce'

export default {
  components: {
    MavonEditor,
    Tinymce
  },
  data() {
    return {
      rte: false,
      markdown: true
    }
  },
  methods: {
    goBack() {  
      this.$router.go(-1)
    },
    select(data) {
      if(data == 'markdown'){
        this.markdown = true
        this.rte = false
      } else {
        this.markdown = false
        this.rte = true
      }
      console.log(data + this.markdown + " " + this.rte)
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 10px;
  }

  .title-input {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .head-card {
    margin-bottom: 20px;
  }
</style>