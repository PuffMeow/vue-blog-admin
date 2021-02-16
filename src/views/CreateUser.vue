<template>
  <div>
    <h1 style="margin-bottom:2rem; font-size:1.5rem;">管理员{{ id ? '修改' : '创建' }}</h1>
    <el-form label-width="80px" @submit.native.prevent="onSubmit">
      <el-form-item label="用户名">
        <el-input v-model="model.username" placeholder="输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="model.password" placeholder="输入密码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="success" native-type="submit">立即{{ id ? '修改':'创建'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String },
  },

  data() {
    return {
      model: {
        username: "",
        password: "",
      },
    };
  },

  created() {
    this.id && this.fetch();
  },

  methods: {
    async fetch() {
      const res = await this.$axios.get(`/auth/getDetail/${this.id}`);
      console.log(res);
      this.model = res.data;
    },
    async onSubmit() {
      if (this.id) {
        const res = await this.$axios.put(
          `/auth/editUser/${this.id}`,
          this.model
        );
        this.$message({
          type: "success",
          message: "修改成功",
        });
        console.log(res);
        this.$router.push("/userList");

        return;
      }
      const res = await this.$axios.post("/auth/createUser", this.model);
      this.$message({
        type: "success",
        message: "创建成功",
      });
      console.log(res);
      this.$router.push("/userList");
    },
  },
};
</script>

