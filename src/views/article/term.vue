<template>
  <el-card class="container">
    <h3>所有分类目录</h3>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="src" label="图片"> </el-table-column>
      <el-table-column prop="count" label="文章数量" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button type="danger" @click="toggleDel()">批量删除</el-button>
      <el-button type="primary">添加分类目录</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '未分类',
          src: 'http://www.baidu.com',
          count: 100
        },
        {
          name: '未分类',
          src: 'http://www.baidu.com',
          count: 100
        },
        {
          name: '未分类',
          src: 'http://www.baidu.com',
          count: 100
        },
        {
          name: '未分类',
          src: 'http://www.baidu.com',
          count: 100
        }
      ],
      multipleSelection: [],
    };
  },
  methods: {
    toggleDel(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style scoped>
.container {
  margin: 15px;
}
</style>