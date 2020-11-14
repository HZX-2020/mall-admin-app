<template>
  <div id="app">
    <router-view v-show="$route.meta.isLogin" />
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  },
};
</script>

<style>

</style>
