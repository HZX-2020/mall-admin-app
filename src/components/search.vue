<template>
  <div class="search-box">
    <a-form-model
      layout="inline"
      :model="searchForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="检索关键字">
        <a-input v-model="searchForm.searchWord" placeholder="关键词"></a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目" >
        <a-select
          allowClear
          placeholder="请选择商品类目"
          style="width: 200px"
          @change="handleChange"
        >
          <a-select-option v-for="c in data" :key="c.id" :value="c.id">
              {{c.name}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
          >搜索</a-button
        >
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>

export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['data'],
  created() {
  },
  methods: {
    // 提交时触发的函数事件
    handleSubmit() {
      this.$emit('submit', this.searchForm); // 子组件给父组件传递数据 $emit
    },
    // 切换类目时触发的函数事件
    handleChange(val) {
      this.searchForm.category = val;
    },
  },
};
</script>

<style lang="less">
.search-box {
    padding: 10px 30px;
}
</style>
