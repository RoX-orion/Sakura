<template>
  <el-card class="container">
    <h3>所有分类目录</h3>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="imgSrc" label="图片"> </el-table-column>
      <el-table-column prop="postCount" label="文章数量" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button type="danger" @click="toggleDel()">批量删除</el-button>
      <el-button type="primary" @click="dialogFormVisible = true">添加分类目录</el-button>
    </div>
    <el-dialog title="添加新分类目录" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="目录名称" :label-width="formLabelWidth">
          <el-input v-model="term" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="目录图片" :label-width="formLabelWidth">
          <el-input v-model="term" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父目录" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="选择父目录" v-for="i in tableData" :key="i.name">
            <el-option :label="i.name" :value="i.termId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTerm">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { addTerm, selectTerm } from '@/api/article'

export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
      },
      term: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      tableData: [],
      multipleSelection: [],
    };
  },
  created() {
    this.selectTerm()
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
    addTerm() {
      this.dialogFormVisible = false
      console.log(this.form.region)
    },
    selectTerm() {
      selectTerm().then(response => {
        const data = response.data
        this.tableData = data.list
      })
    }
  }
}
</script>

<style scoped>
.container {
  margin: 15px;
}
</style>