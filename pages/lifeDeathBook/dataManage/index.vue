<template>
  <div>
    <n-button @click="cuttentClassName = item.className" class="m-1.25" v-for="item in list" :key="item.className"
      type="warning">
      {{ item.name }}
    </n-button>
  </div>
  <div class="bg-[#8064A2] w-81.25 h-81.25 flex-center">
    <span :class="`bg-[url(/assets/images/wind.png)] bg-no-repeat w-13.75 h-15 b-1-ccc inline-block ${cuttentClassName}`"></span>
  </div>
</template>

<script setup lang="ts">
const cuttentClassName = ref('')
const list = [
  {
    name: '一级风',
    className: 'bg-[position:0_0]'
  },
  {
    name: '二级风',
    className: 'bg-[position:-65_0]'
  },
  {
    name: '三级风',
    className: 'bg-[position:-128_0]'
  },
  {
    name: '四级风',
    className: 'bg-[position:-192_0]'
  },
  {
    name: '五级风',
    className: 'bg-[position:-255_0]'
  },
  {
    name: '六级风',
    className: 'bg-[position:0_-65]'
  },
  {
    name: '七级风',
    className: 'bg-[position:-65_-65]'
  },
  {
    name: '八级风',
    className: 'bg-[position:-128_-65]'
  },
  {
    name: '九级风',
    className: 'bg-[position:-192_-65]'
  },
  {
    name: '十级风',
    className: 'bg-[position:-255_-65]'
  },
  {
    name: '十一级风',
    className: 'bg-[position:0_-128]'
  },
  {
    name: '十二级风',
    className: 'bg-[position:-65_-128]'
  },
  {
    name: '十三级风',
    className: 'bg-[position:-128_-128]'
  },
  {
    name: '十四级风',
    className: 'bg-[position:-192_-128]'
  },
  {
    name: '十五级风',
    className: 'bg-[position:-255_-128]'
  },
  {
    name: '十六级风',
    className: 'bg-[position:0_-192]'
  },
  {
    name: '十七级风',
    className: 'bg-[position:-65_-192]'
  },
  {
    name: '十八级风',
    className: 'bg-[position:-128_-192]'
  },
  {
    name: '十九级风',
    className: 'bg-[position:-192_-192]'
  },
  {
    name: '二十级风',
    className: 'bg-[position:-255_-192]'
  },
  {
    name: '二十一级风',
    className: 'bg-[position:0_-255]'
  },
]
</script>