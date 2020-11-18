<template>
  <div class="add">
    <a-input placeholder="" />
    <a-textarea placeholder="" :auto-size="{ minRows: 2, maxRows: 6 }" />
    <div>
    <a-select :default-value="provinceData[0]" style="width: 120px" @change="handleProvinceChange">
      <a-select-option v-for="province in provinceData" :key="province">
        {{ province }}
      </a-select-option>
    </a-select>
    <a-select v-model="secondCity" style="width: 120px">
      <a-select-option v-for="city in cities" :key="city">
        {{ city }}
      </a-select-option>
    </a-select>
  </div>
    <a-select
      mode="multiple"
      :default-value="['a1', 'b2']"
      style="width: 100%"
      placeholder="Please select"
      @change="handleChange"
    >
      <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
        {{ (i + 9).toString(36) + i }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};
export default {
  data() {
    return {
      provinceData,
      cityData,
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
    };
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleProvinceChange(value) {
      this.cities = cityData[value];
      // this.secondCity = cityData[value][0];
    },
  },
};
</script>

<style>
</style>
