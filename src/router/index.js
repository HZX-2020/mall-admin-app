import Vue from 'vue';
import store from '@/store';
import VueRouter from 'vue-router';
import getMenuRoutes from '@/util/permission';
import Home from '../views/layout/Home.vue';

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);
const asyncRouterMap = [{
  path: '/product',
  name: 'Product',
  component: Home,
  meta: {
    title: '商品',
    hidden: false,
    icon: 'inbox',
  },
  children: [
    {
      path: '/list',
      name: 'ProductList',
      meta: {
        title: '商品列表',
        hidden: false,
        icon: 'unordered-list',
      },
      component: () => import('../views/page/productList.vue'),
    },
    {
      path: '/add',
      name: 'ProductAdd',
      meta: {
        title: '添加商品',
        hidden: false,
        icon: 'plus-circle',
      },
      component: () => import('../views/page/productAdd.vue'),
    },
    {
      path: '/edit/:id',
      name: 'ProductEdit',
      meta: {
        title: '编辑商品',
        hidden: true,
        icon: 'plus-circle',
      },
      component: () => import('../views/page/productAdd.vue'),
    },
    {
      path: '/category',
      name: 'Category',
      meta: {
        title: '类目管理',
        hidden: false,
        icon: 'file-add',
      },
      component: () => import('../views/page/Category.vue'),
    },
  ],
},
];
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: Home,
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: '统计',
          hidden: false,
          icon: 'area-chart',
        },
        component: () => import('../views/page/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
      icon: 'login',
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
        // routes = routes.filter((r) => r.name !== 'Login');
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;
