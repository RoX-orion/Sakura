<template>
  <div>
    <el-card class="box-card">
      <el-table 
        :data="tableData"
        style="width: 100%">
        <el-table-column label="序号" type="index" :index="getIndex"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="登录时间" prop="loginDate"></el-table-column>
        <el-table-column label="设备" prop="os"></el-table-column>
        <el-table-column label="浏览器(内核)" prop="browser"></el-table-column>
        <el-table-column label="IP地址" prop="ip"></el-table-column>
        <el-table-column label="备注" prop="remarks">无</el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="small" type="primary" style="margin-left: 10px" @click="handleEdit(scope.$index, scope.row)">备注</el-button>
            <el-button size="small" type="danger" style="margin-top: 5px" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          :page-size="size"
          :current-page="page"
          :hide-on-single-page="true"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-card>
  </div>
</template>


<script>
import { getLoginHistory } from "@/api/getInformation"

export default {
  data() {
    return {
      index: 1,
      remarks: "无",
      total: 0,
      page: 1,
      size: 20,
      tableData: [],
      search: "",
    };
  },
  mounted() {
    this.getLoginHistory(this.page);
  },
  methods: {
    getLoginHistory(page) {
      const count = this.size
      getLoginHistory({count, page}).then(response => {
        const { data } = response
        this.tableData = data.list
        this.total = data.total
      });
    },
    changePage(page) {
      this.getLoginHistory(page)
      this.page = page
    },
    getIndex(index) {
      return (this.page - 1) * 20 + index + 1
    }
  }
}
</script>

<style scoped>
  .box-card {
    height: 100%;
  }
</style>