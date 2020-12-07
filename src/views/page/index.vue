<template>
  <div class="index">
    <div class="card">
      <card />
    </div>
    <charts />
  </div>
</template>
<script>
import Card from '@/components/card.vue';
import Charts from '@/components/charts.vue';

export default {
  components: {
    Card,
    Charts,
  },
};
</script>
