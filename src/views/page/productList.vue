<template>
  <div class="search-list">
    <!-- 搜索 -->
    <search-box @submit="searchSubmit" :data="categoryList"/>
    <a-button class="product-add-btn">
      <router-link :to="{name: 'ProductAdd'}">添加商品</router-link>
    </a-button>
    <!-- 表格 -->
    <product-table :data="tableData"
                   :isloading="isloading"
                   :categoryList="categoryList"
                   @edit="editProduct"
                   @remove="removeProduct"
                   />
  </div>
</template>
<script>
import api from '@/api/product';
import categoryApi from '@/api/category';
import searchBox from '@/components/search.vue';
import productTable from '@/components/productTable.vue';

export default {
  components: {
    searchBox,
    productTable,
  },
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      categoryObj: {},
      isloading: false,
    };
  },
  async created() {
    await categoryApi.list().then((resp) => {
      this.categoryList = resp.data;
      resp.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData(page, size) {
      this.isloading = true;
      api.list({
        page,
        size,
        ...this.searchForm,
      }).then((resp) => {
        this.tableData = resp.data.map((item) => ({
          ...item,
          categoryName: this.categoryObj[item.category].name,
        }));
        this.isloading = false;
      });
    },
    // 编辑商品
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
          form: record,
        },
      });
    },
    // 删除商品
    removeProduct(record) {
      this.$confirm({
        title: '确定删除商品吗?',
        content: `确定删除商品标题为：${record.title}的商品吗？`,
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          api.remove({
            id: record.id,
          }).then(() => {
            this.getTableData();
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
  },
};
</script>

<style lang="less">
@import url('~@/assets/css/productList.less');
</style>
