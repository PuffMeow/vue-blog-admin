<template>
  <div>
    <h1 style="margin-bottom:2rem; font-size:1.5rem;">留言列表</h1>
    <el-input
      v-model="keyword"
      size="mini"
      @input="handleInput"
      style="width:20%;"
      placeholder="输入关键字搜索"
    />

    <el-table :data="tableData">
      <el-table-column label="发表时间" prop="updatedAt"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="留言内容" prop="message"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
    };
  },
  created() {
    // this.fetch();
    this.handlePageOpt(this.pageSize, this.currentPage);
    this.handleGetMessageNum();
  },
  methods: {
    formateTime() {
      this.tableData.forEach((el) => {
        el.updatedAt = dayjs(el.updatedAt).format("YYYY/MM/DD hh:mm");
      });
    },

    async handleInput(value) {
      if (value !== "") {
        const res = await this.$axios.get(
          `/comment/searchMessage/${this.keyword}`
        );
        this.tableData = res.data;
        this.handleGetMessageNum();
        this.formateTime();
      } else {
        this.handlePageOpt(this.pageSize, this.currentPage);
      }
    },

    async handleDelete(index, { comment, _id }) {
      console.log(index, _id);
      await this.$axios.delete(`/comment/delMessage/${_id}`);
      try {
        await this.$confirm(
          `此操作将永久删除“${comment}”, 是否继续? `,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        );
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.totalCount--;
        this.handlePageOpt(this.pageSize, this.currentPage);
      } catch (err) {
        console.log(err);
      }
    },

    async handlePageOpt(pageSize, page) {
      const res = await this.$axios.get(
        `/comment/getMessages/${pageSize}/${page}`
      );
      this.tableData = res.data;
      this.formateTime();
    },

    async handleGetMessageNum() {
      const res = await this.$axios.get("/comment/getMessageNum");
      this.totalCount = res.data;
    },

    handleSizeChange(val) {
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
      this.handlePageOpt(this.pageSize, this.currentPage);
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.handlePageOpt(this.pageSize, val);
    },
  },
};
</script>
