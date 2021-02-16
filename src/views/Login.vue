<template>
  <div class="login-container">
    <el-card class="login-card" header="个人博客后台管理系统">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-button native-type="submit" type="primary">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    }
  },
  methods: {
    async login() {
      if (this.model.username === '' || this.model.password === '') {
        this.$message({
          type: 'error',
          message: '账号或密码不能为空',
        })
        return
      }

      const res = await this.$axios.post('/auth/login', this.model)
      // console.log(res);
      //把token存到本地里
      localStorage.token = res.data.token
      localStorage.username = this.model.username
      this.$store.commit('setToken', res.data.token)
      this.$store.commit('setUsername', this.model.username)
      console.log(this.$store.state.Authorization)
      this.$router.replace('/')
      this.$message({
        type: 'success',
        message: '登录成功',
      })
    },
  },
}
</script>

<style>
.login-card {
  width: 25rem;
  margin: 7rem auto;
}
</style>
