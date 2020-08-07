<template>
  <div>
    <el-card class="box-card">
      <el-table 
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column label="序号" type=index></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="登录时间" prop="loginDate"></el-table-column>
        <el-table-column label="设备" prop="os"></el-table-column>
        <el-table-column label="浏览器" prop="browser"></el-table-column>
        <el-table-column label="真实IP" prop="realIP"></el-table-column>
        <el-table-column label="代理IP" prop="proxyIP"></el-table-column>
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
      remarks: "无",
      total: 0,
      page: 1,
      size: 20,
      tableList: [],
      tableData: [],
      search: "",
    };
  },
  // computed: {
  //   getTableList() {
  //     return this.tableData
  //   }
  // },
  mounted() {
    this.getLoginHistory(this.page);
  },
  methods: {
    getLoginHistory(page) {
      getLoginHistory(page).then((response) => {
        this.tableData = response.data
        this.total = response.total
        // console.log(this.total)
      });
    },
    prevPage() {
      this.page++
    },
    nextPage() {
      this.page--
    },
    changePage(page) {
      this.getLoginHistory(page)
    }
  }
}
</script>

<style scoped>
  .box-card {
    height: 100%;
  }
</style>