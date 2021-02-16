import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import http from "./http";
import store from './store'

Vue.use(mavonEditor);

Vue.prototype.$axios = http;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
