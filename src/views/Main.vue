<template>
  <div>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246); height:100vh">
        <el-menu
          unique-opened
          :default-openeds="defaultOpened"
          :default-active="$route.path"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              博客页
            </template>
            <el-menu-item-group>
              <template slot="title">主页</template>
              <el-menu-item index="/aboutEdit">关于编辑</el-menu-item>
              <el-menu-item index="/createBlog">新建博客</el-menu-item>
              <el-menu-item index="/blogList">博客列表</el-menu-item>
              <el-menu-item index="/commentList">留言板</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>
              图片空间
            </template>
            <el-menu-item-group>
              <template slot="title">个人空间</template>
              <el-menu-item index="/createImg">新建图片</el-menu-item>
              <el-menu-item index="/imgList">图片列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message"></i>
              管理员设置
            </template>
            <el-menu-item-group>
              <template slot="title">管理员</template>
              <el-menu-item index="/createUser">新建管理员</el-menu-item>
              <el-menu-item index="/userList">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main style="height:100vh;">
          <div class="userBox">
            <span>您来啦~{{ username }}</span>
            <el-dropdown @command="onExit">
              <i class="el-icon-setting" style="margin-left: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <transition name="slide-fade">
            <router-view :key="$route.path" />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return { defaultOpened: ["1"], username: localStorage.username };
  },

  methods: {
    userDrop() {
      console.log("userd");
    },
    onExit() {
      console.log("exit");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.$router.push({ path: "/login", replace: true });
    },
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-20px);
  opacity: 0;
}

.userBox {
  float: right;
  font-size: 0.8rem;
  color: #666;
}
</style>
