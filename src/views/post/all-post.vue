<template>
  <div class="container">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane label="已发布"></el-tab-pane>
      <el-tab-pane label="草稿"></el-tab-pane>
      <el-tab-pane label="回收站"></el-tab-pane>
      <div >
        <el-button size="mini" type="primary">批量操作</el-button>
        <el-button size="mini" type="primary">批量操作</el-button>
        <el-button size="mini" type="primary">批量操作</el-button>
        <div class="search">
          <el-input
            :input="keyword"
            clearable
            placeholder="搜索文章">
            <el-button slot="append" type="success">搜索</el-button>  
          </el-input>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题"> </el-table-column>
        <!-- <el-table-column prop="term" label="分类目录"> </el-table-column> -->
        <el-table-column prop="comment_count" label="留言"> </el-table-column>
        <el-table-column prop="create_date" label="发布日期"> </el-table-column>
        <el-table-column prop="last_modified" label="最后更新"> </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button size="small" type="primary" style="margin-left: 10px" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" style="margin-top: 5px" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          :page-size="count"
          :current-page="page"
          :hide-on-single-page="true"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tabs>
  </div>
</template>

<script>
import { getPostList } from '@/api/post'

export default {
  data() {
    return {
      tableData: [],
      keyword: "",
      total: 0,
      page: 1,
      count: 20,
    };
  },
  created() {
    this.getPostList()
  },
  methods: {
    getPostList() {
      const data = {
        page: this.page,
        count: this.count
      }
      getPostList(data).then(response =>{
        const { code, data } = response
        if(code == 200) {
          this.tableData = data
        }
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    changePage(page) {
      this.getPostList(page)
      this.page = page
    },
    getIndex(index) {
      return (this.page - 1) * 20 + index + 1
    }
  },
};
</script>

<style scoped>
.container {
  margin: 15px;
}

.tabs {
  margin-bottom: 20px;
}

.search {
  float: right;
}
</style>