import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';
import AboutEdit from '../views/AboutEdit.vue';
import Login from '../views/Login.vue';
import store from '../store';
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routes = [{
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [{
        path: '/',
        name: 'welcom',
        component: () => import('../views/Welcome.vue'),
      },
      {
        path: '/aboutEdit',
        name: 'aboutEdit',
        component: AboutEdit,
      },
      {
        path: '/createBlog',
        name: 'createBlog',
        component: () => import('../views/CreateBlog.vue'),
      },
      {
        path: '/createBlog/:id',
        name: 'editBlog',
        component: () => import('../views/CreateBlog.vue'),
        props: true,
      },
      {
        path: '/blogList',
        name: 'blogList',
        component: () => import('../views/BlogList.vue'),
      },
      {
        path: '/imgList',
        name: 'imgList',
        component: () => import('../views/ImgList.vue'),
      },
      {
        path: '/createImg',
        name: 'createImg',
        component: () => import('../views/CreateImg.vue'),
      },
      {
        path: '/editImg/:id',
        name: 'editImg',
        component: () => import('../views/CreateImg.vue'),
        props: true,
      },
      {
        path: '/createUser',
        name: 'createUser',
        component: () => import('../views/CreateUser.vue'),
      },
      {
        path: '/userList',
        name: 'userList',
        component: () => import('../views/UserList.vue'),
      },
      {
        path: '/editUser/:id',
        name: 'editUser',
        component: () => import('../views/CreateUser.vue'),
        props: true,
      },
      {
        path: '/commentList',
        name: 'commentList',
        component: () => import('../views/CommentList.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: 'hash',
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  console.log(store.state.Authorization);
  if (!to.meta.isPublic && !localStorage.token && !localStorage.username) {
    Vue.prototype.$message({
      type: 'error',
      message: '请登录',
    });
    return next('/login');
  }
  // if (localStorage.token) {
  //   next();
  // }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;