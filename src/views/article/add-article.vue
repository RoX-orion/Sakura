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
            class="meta-cascader"
            :options="options"
            :props="props"
            collapse-tags
            clearable>
          </el-cascader>
          <el-button type="success">添加新分类目录</el-button>
        </el-collapse-item>
        <el-collapse-item title="标签" name="2">
          <el-input
            @change="addTags"
            class="tag-input"
            placeholder="请输入标签名"
            v-model="inputTags"
            clearable>
          </el-input>
          <el-button class="tag-button" type="success">添加</el-button><br>
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
      options: [{
        value: 1,
        label: '东南',
        children: [{
          value: 2,
          label: '上海',
          children: [
            { value: 3, label: '普陀' },
            { value: 4, label: '黄埔' },
            { value: 5, label: '徐汇' }
          ]
        }, {
          value: 7,
          label: '江苏',
          children: [
            { value: 8, label: '南京' },
            { value: 9, label: '苏州' },
            { value: 10, label: '无锡' }
          ]
        }, {
          value: 12,
          label: '浙江',
          children: [
            { value: 13, label: '杭州' },
            { value: 14, label: '宁波' },
            { value: 15, label: '嘉兴' }
          ]
        }]
      }, {
        value: 17,
        label: '西北',
        children: [{
          value: 18,
          label: '陕西',
          children: [
            { value: 19, label: '西安' },
            { value: 20, label: '延安' }
          ]
        }, {
          value: 21,
          label: '新疆维吾尔族自治区',
          children: [
            { value: 22, label: '乌鲁木齐' },
            { value: 23, label: '克拉玛依' }
          ]
        }]
      }]
    }
  },
  methods: {
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
      this.tags.push({name: this.inputTags, type: 'success'})
      this.inputTags=''
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

  .meta-cascader {
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