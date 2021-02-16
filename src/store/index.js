import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Authorization: '',
    username: '',
  },
  mutations: {
    setToken(state, token) {
      state.Authorization = token;
    },
    setUsername(state, username) {
      state.username = username;
    },
  },
  actions: {},
  modules: {},
});
