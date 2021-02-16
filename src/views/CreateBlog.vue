<template>
  <div>
    <h1 style="margin-bottom:2rem; font-size:1.5rem;">博客{{ id ? '修改' : '创建' }}</h1>
    <el-form label-width="80px">
      <el-form-item label="封面图">
        <el-upload
          class="avatar-uploader"
          :headers="headers"
          :action="$axios.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="handleSuccess"
        >
          <img v-if="model.cover" :src="model.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <mavon-editor v-model="model.description" />
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="onSubmit">立即{{ id ? '保存' : '创建' }}</el-button>
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
        cover: "",
        title: "",
        description: "",
      },
      headers: { Authorization: `Bearer ${localStorage.token || ""}` },
    };
  },
  created() {
    // console.log(this.id);
    this.id && this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$axios.get(`/blog/getDetail/${this.id}`);
      console.log(res);
      this.model.cover = res.data.cover;
      this.model.title = res.data.title;
      this.model.description = res.data.description;
    },
    handleSuccess(response) {
      this.model.cover = response.url;
    },
    onSubmit() {
      if (!this.model.cover || !this.model.title || !this.model.description) {
        this.$message({
          type: "error",
          message: "请输入完整数据",
        });
        return;
      }
      if (this.id) {
        this.$axios.put(`/blog/editBlog/${this.id}`, this.model);
        this.$message({
          type: "success",
          message: "保存成功",
        });
        this.$router.push("/blogList");
      } else {
        this.$axios.post("/blog/createBlog", this.model);
        this.$message({
          type: "success",
          message: "创建成功",
        });
        this.$router.push("/blogList");
      }
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 0.375rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 1.75rem;
  color: #8c939d;
  width: 6.25rem;
  height: 6.25rem;
  line-height: 6.25rem;
  text-align: center;
}
.avatar {
  width: 6.25rem;
  height: 6.25rem;
  display: block;
}
</style>
