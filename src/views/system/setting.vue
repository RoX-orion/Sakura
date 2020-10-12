<template>
  <div class="container">
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="页面设置" name="first">
          <p>ndajkhu</p>
        </el-tab-pane>
        <el-tab-pane label="文章设置" name="second">
          <div class="line-hight nice-size">特色图片缺省时默认图片</div>
          <el-input style="margin-bottom: 40px" placeholder="请输入图片地址"></el-input>
          <div class="line-hight nice-size">公告</div>
          <el-input
            type="textarea"
            placeholder="请输入公告内容"
            v-model="textarea"
            maxlength="256"
            show-word-limit
          ></el-input>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'second'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 15px;
  }

  .nice-size {
    font-size: 18px;
  }

  .line-hight {
    margin: 10px;
  }
</style>