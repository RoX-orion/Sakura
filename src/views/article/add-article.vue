<template>
  <div class="container">
    <el-card class="head-card">
      <el-page-header @back="goBack" content="编辑文章">
      </el-page-header>
      <el-input
      class="title-input"
      placeholder="请输入文章标题">
      </el-input>
      <el-dropdown @command="select" style="margin-right: 20px; margin-bottom: 20px">
        <el-button size="mini" type="primary">
          切换编辑器<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="rte">富文本编辑器</el-dropdown-item>
          <el-dropdown-item command="markdown">MarkDown编辑器</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button-group>
        <el-button size="mini" type="primary" icon="el-icon-edit">保存草稿</el-button>
        <el-button size="mini" type="success" icon="el-icon-share">立即发布</el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete">移至回收站</el-button>
      </el-button-group>
    </el-card>
    <div>
      <router-view/>
      <mavon-editor v-if="markdown"/>
      <tinymce v-else/>
    </div>
    <el-card class="attribute">
      <div style="font-size: 18px; margin-bottom: 10px">文章属性设置</div>
      <el-collapse>
        <el-collapse-item title="分类目录" name="1">
          <el-cascader
            class="term-cascader"
            :options="options"
            :props="props"
            collapse-tags
            clearable>
          </el-cascader>
          <el-button type="success" @click="dialogFormVisible = true">添加新分类目录</el-button>
          <el-dialog title="添加新分类目录" :visible.sync="dialogFormVisible">
            <el-form>
              <el-form-item label="目录名称" :label-width="formLabelWidth">
                <el-input v-model="newTerm" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="父级目录" :label-width="formLabelWidth">
                <el-select  placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </el-collapse-item>
        <el-collapse-item title="标签" name="2">
          <el-input
            @keyup.enter.native="addTags"
            class="tag-input"
            placeholder="请输入标签名"
            v-model="inputTags"
            clearable>
          </el-input>
          <el-button @click.native="addTags" class="tag-button" type="success">添加</el-button><br>
          <el-tag
            style="margin-right: 5px"
            v-for="tag in tags"
            :key="tag.name"
            closable
            @close="closeTag(tag)"
            :type="tag.type">
            {{tag.name}}
          </el-tag>
        </el-collapse-item>
        <el-collapse-item title="特色图片" name="3">
          
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import MavonEditor from '@/components/MavonEditor'
import Tinymce from '@/components/Tinymce'

export default {
  components: {
    MavonEditor,
    Tinymce
  },
  data() {
    return {
      markdown: true,
      props: { multiple: true },
      inputTags: '',
      tags: [],
      dialogFormVisible: false,
      newTerm: '',
      formLabelWidth: '120px',
      options: [{
        value: 1,
        label: '东南',
        children: [{
          value: 2,
          label: '上海',
        }, {
          value: 7,
          label: '江苏',
        }, {
          value: 12,
          label: '浙江',
        }]
      }, {
        value: 17,
        label: '西北',
        children: [{
          value: 18,
          label: '陕西',
        }, {
          value: 21,
          label: '新疆维吾尔族自治区',
        }]
      }]
    }
  },
  methods: {
    test(){
      console.log("按了回车")
    },
    goBack() {  
      this.$router.go(-1)
    },
    select(data) {
      if(data == 'markdown'){
        this.markdown = true
      } else {
        this.markdown = false
      }
    },
    addTags() {
      if(this.inputTags == '')
        return
      let i = 0
      for(; i < this.tags.length; i++){
        if(this.inputTags == this.tags[i].name) {
          this.$message({
            message: '该标签已存在!',
            type: "warning",
            center: true,
            showClose: true
          })
          break
        }
      }
      if(i == this.tags.length) {
        this.tags.push({name: this.inputTags, type: 'success'})
        this.inputTags=''
      }
    },
    closeTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 10px;
  }

  .title-input {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .head-card {
    margin-bottom: 20px;
  }

  .attribute {
    margin-top: 20px;
  }

  .term-cascader {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .tag-button {
    margin-bottom: 5px;
  }

  .tag-input {
    width: 80%;
    margin-bottom: 10px;
    margin-right: 10px;
  }
</style>