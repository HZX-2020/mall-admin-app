// 对于用户操作的接口管理
import axios from './axios';

export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
  getCode(email) {
    return axios.post('/passport/getCode', email);
  },
  // 找回密码
  findBack(params) {
    return axios.post('/passport/findBack', params);
  },
  // 修改用户信息
  changeUserInfo(params) {
    return axios.post('/passport/changeUserInfo', params);
  },
  // 用户注册
  loginApp(params) {
    return axios.post('/passport/login', params);
  },
};
