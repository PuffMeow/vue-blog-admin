import Vue from 'vue';

export default function message(type, message) {
  Vue.prototype.$message({
    type: type,
    message: message,
  });
}
