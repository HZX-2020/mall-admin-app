// 类目有关接口管理

import axios from '@/api/axios';

export default {
// 查询类目列表信息
  list(params) {
    return axios.get('/category/all', { params });
  },
  // 商品类目新增
  categoryAdd(params) {
    return axios.get('/category/add', { params });
  },
  // 商品类目编辑
  editCategory(params) {
    return axios.put('/category/edit', params);
  },
  // 商品类目删除
  delCategory(id, appkey) {
    return axios.delete(`/category/:${id}?appkey=${appkey}`);
  },
};
