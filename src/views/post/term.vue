<template>
  <div class="container">
    <div style="margin-bottom: 15px">
      <el-button type="danger" @click="toggleDel()">批量删除</el-button>
      <el-button type="primary" @click="dialogFormVisible = true">添加分类目录</el-button>
    </div>
    <el-card>
      <h3>所有分类目录</h3>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.imgSrc" width="50px" height="50px"/>
          </template>
        </el-table-column>
        <el-table-column prop="postCount" label="文章数量" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-dialog title="添加新分类目录" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="目录名称" :label-width="formLabelWidth">
            <el-input v-model="term" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="目录图片" :label-width="formLabelWidth">
            <el-input v-model="term" autocomplete="off">
              <el-button slot="append" @click="dialogFormVisible = false">选择</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="父目录" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="选择父目录">
              <el-option v-for="i in tableData" :key="i.name" v-if="i.termId == i.termGroup" :label="i.name" :value="i.termId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTerm">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
  
</template>

<script>
import { addTerm, getTerm } from '@/api/post'

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
      subTableData: [],
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
    getTerm() {
      getTerm().then(response => {
        const data = response.data.list
        // let j = 0;
        // let k = 0;
        // for(let i = 0; i<data.length; i++){
        //   if(data[i].termId == data[i].termGroup){
        //     this.tableData[k++] = data[i]
        //   } else{
        //     this.subTableData[j++] = data[i]
        //   }
        // }
        this.tableData = data
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