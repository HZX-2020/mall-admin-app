<template>
  <div class="menu-list">
    <a-menu
      class="ant-menu"
      :default-selected-keys="['1']"
      :default-open-keys="['1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <a-sub-menu v-for="route in $store.state.menuRoutes" :key="route.name">
        <span slot="title"><a-icon type="home" /><span>{{route.meta.title}}</span></span>
        <a-menu-item v-for="child in route.children"
        :key="child.name">{{child.meta.title}}</a-menu-item>
      </a-sub-menu>

    </a-menu>
  </div>
</template>
