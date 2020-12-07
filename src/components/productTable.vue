<template>
  <div class="table">
      <a-table
      :row-selection="rowSelection"
      :loading="isloading"
    :columns="columns"
    :data-source="tableData">
      <div slot="operation" slot-scope="text,record">
         <a-button @click="editProduct(record)">编辑</a-button>
         <a-button @click="removeProduct(record)">删除</a-button>
      </div>
    </a-table>
  </div>
</template>

<script>

const columns = [
  {
    title: 'id',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: '标题',
    key: 'title',
    dataIndex: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    key: 'desc',
    dataIndex: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    key: 'category',
    dataIndex: 'categoryName',
  },
  {
    title: '预售价格',
    key: 'price',
    dataIndex: 'price',
  },
  {
    title: '折扣价格',
    key: 'price_off',
    dataIndex: 'price_off',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购买数量',
    key: 'inventory',
    dataIndex: 'inventory',
  },
  {
    title: '上架状态',
    key: 'status',
    dataIndex: 'status',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    key: 'operation',
    dataIndex: 'operation',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },

];

export default {
  data() {
    return {
      columns,
      selectedRowKeys: '',
    };
  },
  props: ['data', 'isloading'],

  computed: {
    tableData() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.selectedRowKeys = selectedRowKeys;
        },
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          },
        }),
      };
    },
  },
  methods: {
    editProduct(record) {
      this.$emit('edit', record);
    },
    removeProduct(record) {
      this.$emit('remove', record);
    },
    // handleChange(value) {
    //   console.log(`selected ${value}`);
    // },
  },
};
</script>

<style>

</style>
