<template>
  <div class="category">
    <a-table :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="action">
        <a-divider type="vertical" />
        <a>删除</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> 修改 <a-icon type="down" /> </a>
      </span>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: '_id',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '子类目',
    dataIndex: 'c_items',
    key: 'c_tiems',
  },
  {
    title: '编辑',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [
  {
    _id: '1',
    id: 32,
    name: '水果',
    c_items: '苹果',
  },
  {
    _id: '1',
    id: 32,
    name: '水果',
    c_items: '苹果',
  },
  {
    _id: '1',
    id: 32,
    name: '水果',
    c_items: '苹果',
  },
];

export default {
  data() {
    return {
      data,
      columns,
    };
  },
};
</script>
