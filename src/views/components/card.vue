<template>
  <div class="card-container">
    <el-button type="primary" style="margin-bottom: 10px" @click="dialogFormVisible = true">添加卡片</el-button>
    <el-row :gutter="20">
      <el-col v-for="(item, index) in card" :key="index" :sm="12" :xs="24" :lg="6" :md="8" style="margin-bottom: 20px">
        <card :src="item.src" :title="item.title" :text="item.text"/>
      </el-col>
    </el-row>


    <el-dialog title="添加卡片" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="图片地址" :label-width="formLabelWidth">
          <el-input v-model="form.src" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="卡片名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="卡片说明" :label-width="formLabelWidth">
          <el-input v-model="form.text" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer"> 
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCard">确 定</el-button>
      </div>
    </el-dialog>
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
      formLabelWidth: '120px'
    }
  },
  mounted() {
      this.getCard(this.page)
  },
  methods: {
    addCard() {
      this.dialogFormVisible = false
      const src = this.form.src
      const title = this.form.title
      const text = this.form.text
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