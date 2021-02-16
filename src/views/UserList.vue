<template>
  <div>
    <h1 style="margin-bottom:2rem; font-size:1.5rem;">管理员列表</h1>
    <el-table :data="tableData">
      <el-table-column label="最后更新时间" prop="updatedAt"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$axios.get("/auth/getUsers");
      console.log("res", res);
      this.tableData = res.data;
      this.formateTime();
    },

    formateTime() {
      this.tableData.forEach((el) => {
        el.updatedAt = dayjs(el.updatedAt).format("YYYY/MM/DD hh:mm");
      });
    },

    async handleDelete(index, { username, _id }) {
      console.log(index, _id);
      await this.$axios.delete(`/auth/delUser/${_id}`);
      try {
        await this.$confirm(
          `此操作将永久删除“${username}”, 是否继续? `,
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
        this.fetch();
      } catch (err) {
        console.log(err);
      }
    },

    handleEdit(index, { _id }) {
      console.log(_id);
      this.$router.push(`/editUser/${_id}`);
    },
  },
};
</script>
