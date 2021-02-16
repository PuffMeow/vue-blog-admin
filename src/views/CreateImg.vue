<template>
  <div>
    <h1 style="margin-bottom:2rem; font-size:1.5rem;">图片项{{ id ? '修改' : '创建' }}</h1>
    <el-form label-width="80px">
      <el-form-item label="封面图">
        <el-upload
          :action="$axios.defaults.baseURL + '/upload'"
          :headers="headers"
          :on-success="handleSuccess"
          :show-file-list="false"
          class="avatar-uploader"
        >
          <img :src="model.cover" class="avatar" v-if="model.cover" />
          <i class="el-icon-plus avatar-uploader-icon" v-else></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <vue-editor @image-added="handleImageAdded" useCustomImageHandler v-model="model.content"></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button @click="onSubmit" type="success">立即{{ id ? '保存' : '创建' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  props: {
    id: { type: String },
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {
        cover: '',
        title: '',
        content: '',
      },
      headers: { Authorization: `Bearer ${localStorage.token || ''}` },
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5] }],
        ['bold', 'italic', 'underline', 'color', 'background'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['image', 'code-block'],
        ['link'],
      ],
    }
  },
  created() {
    console.log(this.id)
    this.id && this.fetch()
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)

      const res = await this.$axios.post('/upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.url)
      resetUploader()
    },
    async fetch() {
      const res = await this.$axios.get(`/imgs/getDetail/${this.id}`)
      console.log(res)
      this.model.cover = res.data.cover
      this.model.title = res.data.title
      this.model.content = res.data.content
    },
    handleSuccess(response) {
      this.model.cover = response.url
    },
    onSubmit() {
      if (!this.model.cover || !this.model.title || !this.model.content) {
        this.$message({
          type: 'error',
          message: '请输入完整数据',
        })
        return
      }
      if (this.id) {
        this.$axios.put(`/imgs/editImg/${this.id}`, this.model)
        this.$message({
          type: 'success',
          message: '保存成功',
        })
        this.$router.push('/imgList')
      } else {
        this.$axios.post('/imgs/createImg', this.model)
        this.$message({
          type: 'success',
          message: '创建成功',
        })
        this.$router.push('/imgList')
      }
    },
  },
}
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
