<template>
  <div class="container">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane label="已发布"></el-tab-pane>
      <el-tab-pane label="草稿"></el-tab-pane>
      <el-tab-pane label="回收站"></el-tab-pane>
      <el-button type="primary">批量操作</el-button>
      <el-button type="primary">批量操作</el-button>
      <el-button type="primary">批量操作</el-button>
      <el-button type="primary">批量操作</el-button>
      <el-button type="primary">批量操作</el-button>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="meta"
          label="分类目录">
        </el-table-column>
        <el-table-column
          prop="message"
          label="留言">
        </el-table-column>
        <el-table-column
          prop="postDate"
          label="发布日期">
        </el-table-column>
        <el-table-column
          prop="postModified"
          label="最后更新">
        </el-table-column>
      </el-table>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[]
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 15px;
  }
  
  .tabs {
    margin-bottom: 20px;
  }
</style>