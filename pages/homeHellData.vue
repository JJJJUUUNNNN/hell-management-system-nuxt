<template>
  <div class="mb-20">
    <n-flex class="header">
      <n-card title="地府人数" hoverable> 000000 </n-card>
      <n-card title="今日入境" hoverable> 000000 </n-card>
      <n-card title="今日出境" hoverable> 000000 </n-card>
      <n-card title="孤魂野鬼" hoverable> 000000 </n-card>
      <n-card title="管理人员" hoverable> 000000 </n-card>
      <n-card title="冥币资产" hoverable> 000000 </n-card>
    </n-flex>
    <div class="m-[20px_0]">
      <div class="card">
        <Chart :options="lineOptions" id="chart" />
      </div>
      <div class="card">
        <Chart :options="barOptions" id="chart2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const lineOptions = ref({
  type: "line",
  seriesData: [150, 230, 224, 218, 135, 147, 260],
});

const barOptions = ref({
  type: "bar",
  seriesData: [120, 200, 150, 80, 70, 110, 130],
});
</script>

<style scoped>
.header .n-card {
  max-width: 300px;
}
</style>
