<template>
  <div class="menu-list">
    <a-menu
      class="ant-menu"
      :default-selected-keys="[defaultSelectKey]"
      :default-open-keys="[defaultOpenKey]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <a-sub-menu
      v-for="route in $store.state.menuRoutes"
      :key="route.name" v-show="!route.meta.hidden">
        <span slot="title"><a-icon :type="route.meta.icon" />
        <span>{{route.meta.title}}</span></span>
        <template v-for="child in route.children">
          <a-menu-item v-if="!child.meta.hidden" :key="child.name">
          <router-link :to="{name: child.name}">
            <a-icon :type="child.meta.icon" />{{child.meta.title}}
            </router-link>
        </a-menu-item>
        </template>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  computed: {
    defaultSelectKey: {
      get() {
        return this.$router.currentRoute.matched[1]
          ? this.$router.currentRoute.matched[1].name
          : '';
      },
    },
    defaultOpenKey: {
      get() {
        return this.$router.currentRoute.matched[0].name;
      },
    },
  },
};
</script>
