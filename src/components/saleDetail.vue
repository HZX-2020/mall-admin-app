<template>
  <div class="sale-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }" :wrapper-col="{ span: 13 }"
    >
      <a-form-model-item label="商品售价" required prop="price">
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item label="商品折扣价" prop="price_off">
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" required prop="inventory">
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" required prop="unit">
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品图片" prop="images">
        <a-upload
          :action="'https://mallapi.duyiedu.com/upload/images?appkey=' + $store.state.user.appkey"
          list-type="picture-card"
          :file-list="fileList"
          name="avatar"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 4">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-model-item>
      <a-form-model-item>
        <a-switch @change="onChange"
        checked-children="是" un-checked-children="否"
        />
        是否上架
      </a-form-model-item>
      <a-form-model-item label="" :wrapperCol="{span: 22}">
      <a-button @click="prev" type="default" >上一步</a-button>
      <a-button @click="next" type="primary" class="next-btn">提交</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      rules: {},
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  },
  props: ['form'],
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  methods: {
    prev() {
      this.$emit('prev');
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        console.log('error submit!');
        return false;
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
    },
    onChange(checked) {
      if (checked) { // 上架
        this.form.status = 1;
      } else { // 下架
        this.form.status = 0;
      }
    },
  },
};
</script>

<style lang="less">
  .next-btn {
    margin-left: 15px;
  }
</style>
