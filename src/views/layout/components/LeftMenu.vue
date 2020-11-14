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
      <a-sub-menu key="1">
        <span slot="title"><a-icon type="home" /><span>首页</span></span>
        <a-menu-item key="8">统计</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="2">
        <span slot="title"><a-icon type="desktop" /><span>商家</span></span>
        <a-menu-item key="6"> Option 6 </a-menu-item>
        <a-menu-item key="7"> Option 7 </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
