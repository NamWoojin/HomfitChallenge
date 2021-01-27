import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
//const VUE_APP_SERVER_URL = "http://localhost:8080/";
//const SERVER_URL = process.env.VUE_APP_SERVER_URL;
const SERVER_URL = "http://localhost:8080/";

export default new Vuex.Store({
  state: {
    accessToken: null,
    userEmail: '',
    userName: '',
  },
  getters: {
    getAccessToken(state) {
      return state.accessToken;
    },
    getUserEmail(state) {
      return state.userEmail;
    }
  },
  mutations: {
    LOGIN(state, payload) {
      state.accessToken = payload['access-token'];
      state.userEmail = payload['user-email'];
    },
    LOGOUT(state) {
      state.accessToken = null;
      state.userEmail = '';
    }
  },
  actions: {
    LOGIN(context, user) {
      return axios
        .post(`${SERVER_URL}/user/login`, user)
        .then((response) => {
          context.commit('LOGIN', response.data);
          axios.defaults.headers.common[
            'access-token'
          ] = `${response.data['access-token']}`;
        });
    },
    LOGOUT(context) {
      context.commit('LOGOUT');
      axios.defaults.headers.common['access-token'] = undefined;
    },
  },
  modules: {},
});
