import Vue from 'vue';
import store from '@/store';
import VueRouter from 'vue-router';
import getMenuRoutes from '@/util/permission';
import Home from '../views/layout/Home.vue';

Vue.use(VueRouter);
const asyncRouterMap = [{
  path: '/product',
  name: 'Product',
  component: Home,
  meta: {
    title: '商品',
  },
  children: [
    {
      path: '/list',
      name: 'ProductList',
      meta: {
        title: '商品列表',
      },
      component: () => import('../views/page/productList.vue'),
    },
    {
      path: '/productAdd',
      name: 'ProductAdd',
      meta: {
        title: '添加商品',
      },
      component: () => import('../views/page/productAdd.vue'),
    },
    {
      path: '/category',
      name: 'Category',
      meta: {
        title: '类目管理',
      },
      component: () => import('../views/page/category.vue'),
    },
  ],
},
];
let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '/category',
        name: 'Category',
        meta: {
          title: '统计',
        },
        component: () => import('../views/layout/components/Category.vue'),
      },
      // {
      //   path: '/index',
      //   name: 'Index',
      //   meta: {
      //     title: '统计1',
      //   },
      //   component: () => import('../views/page/index.vue'),
      // },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: () => import('../views/Login.vue'),
  },
];

const router = new VueRouter({
  routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.user.role, asyncRouterMap);
        router.addRoutes(menuRoutes);
        routes = routes.filter((r) => r.name !== 'Login');
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes));
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;
