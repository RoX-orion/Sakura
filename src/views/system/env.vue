<template>
  <el-card class="env-container">
    <div class="container">
      <div class="properties">系统属性</div>
      <hr>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="label" label="属性" width="150"></el-table-column>
      <el-table-column prop="data" label="状态"></el-table-column>
    </el-table>
    </div>
  </el-card>
</template>

<script>
import { getStaticInfo } from '@/api/getInformation'

export default {
  data() {
    return {
      // width: ,
      tableData: [
        {label: '操作系统', data: ''},
        {label: '系统用户名', data: ''},
        {label: 'Java提供商', data: ''},
        {label: 'JDK', data: ''},
        {label: 'JVM', data: ''},
        {label: 'SpringBoot', data: ''},
        {label: '数据库', data: ''}
      ]
    }
  },
  created(){
    this.getInfo()
  },
  methods: {
    getInfo(){
      getStaticInfo().then(response => {
        // console.log(response.data)
        const data = response.data
        this.tableData[0].data = data.os
        this.tableData[1].data = data.osUser
        this.tableData[2].data = data.JavaVendor
        this.tableData[3].data = data.JDK
        this.tableData[4].data = data.JVM
        this.tableData[5].data = data.SpringBoot
        this.tableData[6].data = data.database
      })
    }
  }
};
</script>

<style scoped>
  .env-container {
    margin: 15px;
  }
  .container .properties{
    position: sticky;
  }

  .properties{
    font-size: 25px;
  }
</style>