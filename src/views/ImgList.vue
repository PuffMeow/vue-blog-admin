<template>
  <div>
    <h1 style="margin-bottom:2rem; font-size:1.5rem;">图片项列表</h1>
    <el-input
      v-model="keyword"
      size="mini"
      @input="handleInput"
      style="width:20%;"
      placeholder="输入关键字搜索"
    />
    <el-table :data="tableData">
      <el-table-column label="最后更新时间" prop="updatedAt"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="浏览数" prop="visitNum"></el-table-column>
      <el-table-column label="预览图">
        <template slot-scope="scope">
          <img :src="scope.row.cover" width="60" height="60" @click="previewPic(scope.row.cover)" />
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 图片预览 -->
    <el-dialog :visible.sync="dialogVisible" :modal="false" title="图片预览" width="50%">
      <img :src="previewpic" alt width="100%" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页栏 -->
    <div class="block" style="float:right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      tableData: [],
      keyword: "",
      totalCount: 1,
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      // 个数选择器（可修改）
      pageSizes: [5, 10, 20, 30],
      // 默认每页显示的条数（可修改）
      pageSize: 5,
      dialogVisible: false,
      previewpic: ""
    };
  },
  created() {
    // this.fetch();
    this.handlePageOpt(this.pageSize, this.currentPage);
  },
  methods: {
    async fetch() {
      const res = await this.$axios.get("/imgs/getImgs");
      console.log(res);
      this.tableData = res.data;
    },

    previewPic(url) {
      this.previewpic = url;
      this.dialogVisible = true;
    },

    formateTime() {
      this.tableData.forEach(el => {
        el.updatedAt = dayjs(el.updatedAt).format("YYYY/MM/DD hh:mm");
      });
    },

    async handleInput(value) {
      if (value !== "") {
        const res = await this.$axios.get(`/imgs/search/${this.keyword}`);
        this.tableData = res.data;
        this.totalCount = res.data.length;
      } else {
        this.handlePageOpt(this.pageSize, this.currentPage);
      }
    },

    handleEdit(index, { _id }) {
      console.log(index, _id);
      this.$router.push(`/editImg/${_id}`);
    },

    async handleDelete(index, { title, _id }) {
      console.log(index, _id);
      await this.$axios.delete(`/imgs/delImg/${_id}`);
      try {
        await this.$confirm(`此操作将永久删除“${title}”, 是否继续? `, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.handlePageOpt(this.pageSize, this.currentPage);
      } catch (err) {
        console.log(err);
      }
    },

    async handlePageOpt(pageSize, page) {
      const res = await this.$axios.get(`/imgs/getImgs/${pageSize}/${page}`);
      console.log(res);
      this.tableData = res.data.res;
      this.totalCount = res.data.totle;
      this.formateTime();
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
      this.handlePageOpt(this.pageSize, this.currentPage);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.handlePageOpt(this.pageSize, val);
    }
  }
};
</script>
