import axios from 'axios';

import router from './router';
import message from './utils/message';

const http = axios.create({
  baseURL: 'https://www.wangjiquan.cn:3000',
  // baseURL: 'http://localhost:3001',
});

http.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    console.log(err.response.data);
    if (err.response.status === 400) {
      message('error', '账号或密码错误');
      return;
    }
    if (err.response.status === 404) {
      message('error', '请求不存在');
      return;
    }
    if (err.response.status === 401) {
      message('error', '未登录授权');
      router.push('/login');
      return;
    }
    if (err.response.status === 500) {
      message('error', '服务器错误');
      return;
    }
    return Promise.reject(err);
  }
);

export default http;