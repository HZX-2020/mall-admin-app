// 对于商品的接口管理

import axios from '@/api/axios';

export default {
  // 查询产品列表信息
  list(params) {
    return axios.get('/products/all', { params });
  },
  // 新增产品接口
  add(params) {
    return axios.post('/products/add', params);
  },
  // 上传图片接口
  uploadImg(params) {
    return axios.post('/upload/images', params);
  },
  // 编辑产品接口
  edit(params) {
    return axios.put('/products/edit', params);
  },
  // 查询商品详情
  detail(id) {
    return axios.get(`/products/${id}`);
  },
  // 删除商品
  remove(params) {
    return axios.delete(`/products/${params.id}`);
  },
};
