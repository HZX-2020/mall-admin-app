<template>
  <div class="home">
    <left-menu :key="key"/>
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <slider-nav />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/LeftMenu.vue';
import SliderNav from './components/SliderNav.vue';

export default {
  name: 'home',
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  // 菜单组件没有数据更新 导致切换路由不更新
  // 所以添加一个key值 利用时间戳达到数据变化效果
  // watch监听该key值 实现数据更新
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  components: {
    LeftMenu,
    SliderNav,
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
</style>
