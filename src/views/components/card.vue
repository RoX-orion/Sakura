<template>
  <div class="card-container">
    <el-button type="primary" style="margin-bottom: 10px" @click="dialogFormVisible = true">添加卡片</el-button>
    <el-row :gutter="20">
      <el-col v-for="(item, index) in card" :key="index" :sm="12" :xs="24" :lg="8" :md="8" style="margin-bottom: 20px">
        <card :src="item.src" :title="item.title" :text="item.text"/>
      </el-col>
    </el-row>

    <el-row>
      <el-col :lg="12" :md="4" :xs="24">
        <el-dialog title="添加卡片" :visible.sync="dialogFormVisible">
          <el-col :lg="24" :md="24" :xs="24">
            <el-upload
              class="upload-img"
              drag
              list-type="picture"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
              :file-list="fileList"
              :on-change="fileChange"
              >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-col>
            
          
          
          <el-form :model="form">
            <img :src="form.src" width="50%" height="50%">
            <!-- <el-form-item label="图片地址" :label-width="formLabelWidth">
              <el-input v-model="form.src" autocomplete="off" clearable></el-input>
            </el-form-item> -->
            
            <el-form-item label="卡片名称">
              <el-input v-model="form.title" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="卡片说明">
              <el-input v-model="form.text" autocomplete="off" clearable></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer"> 
            <el-button @click="reset">取 消</el-button>
            <el-button type="primary" @click="addCard">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center" style="margin-bottom: 0px;">
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
  </div>
</template>

<script>
import Card from '@/components/Card'
import { getCard, addCard } from '@/api/media'

export default {
  components: {
    Card
  },
  data() {
    return {
      size: 12,
      total: 0,
      page: 1,
      card: [],
      dialogFormVisible: false,
      form: {
        src: '',
        title: '',
        text: '',
      },
      fileList:[],
    }
  },
  mounted() {
      this.getCard(this.page)
  },
  methods: {
    reset(){
      this.dialogFormVisible = false
    },
    fileChange(file, fileList) {
      if (fileList.length>0) {
        this.fileList = [fileList[fileList.length - 1]]
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    addCard() {
      this.dialogFormVisible = false
      const src = this.form.src
      const title = this.form.title
      const text = this.form.text
      console.log(this.fileList.length)
      addCard({src, title, text}).then(response => {
        const code = response.code
        if(code == 200){
          this.getCard(this.page)
        }
      })
    },
    getCard(page) {
      const offset = (page - 1) * this.size
      const count = this.size
      getCard({ offset, count }).then(response => {
        this.card = response.data
        this.total = response.total
        this.form = {}
      })
    },
    changePage(page) {
      this.getCard(page)
      this.page = page
    },
  }
}

</script>

<style scoped>
  .card-container{
    margin: 15px;
  }
</style>

<style>
  .el-upload-dragger{
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
  }
  .el-upload--picture-card{
    width: 200px;
  }
</style>