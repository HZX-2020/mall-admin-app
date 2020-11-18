import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getUserCookie, removeUserCookie } from '@/util/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 导航的收缩状态 false为展开
    collapsed: false,
    // 用户信息
    user: getUserCookie(),
    // 存储菜单路由
    menuRoutes: [],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
      setCookie(userInfo);
    },
    logout(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
    },
    logout({ commit }) {
      commit('logout');
      removeUserCookie();
    },
    changeMenuRoutes({ commit }, routes) {
      commit('changeMenuRoutes', routes);
    },
  },
  modules: {
  },
});
