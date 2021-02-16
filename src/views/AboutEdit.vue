<template>
  <div>
    <h1 style="margin-bottom:2rem; font-size:1.5rem;">网站介绍</h1>
    <el-form ref="form" label-width="80px">
      <el-form-item label="网站名字">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="网站描述">
        <el-input type="textarea" v-model="model.description"></el-input>
      </el-form-item>
      <el-form-item label="轮播图">
        <el-upload
          :action="$axios.defaults.baseURL + '/upload'"
          :headers="headers"
          :file-list="model.swiper"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          list-type="picture"
        >
          <el-button size="small" ref="my-upload">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import message from "../utils/message";
export default {
  data() {
    return {
      model: { name: "", description: "" },
      headers: { Authorization: `Bearer ${localStorage.token || ""}` },
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$axios.get("/about/getAboutDetail");
      console.log(res);
      this.model = res.data[0];
    },
    async onSubmit() {
      if (
        !this.model.name ||
        !this.model.description ||
        this.model.swiper.length === 0
      ) {
        message("error", "请输入完整的数据");
        return;
      }
      await this.$axios.put(
        `/about/editAboutDetail/${this.model._id}`,
        this.model
      );
      message("success", "保存成功");
    },
    handleRemove(file) {
      console.log(file);
      this.model.swiper.forEach((el, i) => {
        if (file.name == el.name) {
          this.model.swiper.splice(i, 1);
        }
      });
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
      this.model.swiper.push({
        name: response.originalname,
        url: response.url,
      });
    },
  },
};
</script>
