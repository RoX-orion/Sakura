<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {changeUserInfo} from '@/api/user'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
      oldUsername: this.user.name
    }
  },
  methods: {
    submit() {
      const data= {
        username: this.user.name,
        email: this.user.email
      }
      console.log(this.oldUsername)
      changeUserInfo(data).then(response=>{
        if(response.code == 20000){
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 3 * 1000
          })
        }
      })
    }
  }
}
</script>
