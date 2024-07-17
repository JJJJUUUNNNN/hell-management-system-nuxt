<template>
  <n-layout has-sider class="h-100vh">
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
      show-trigger @collapse="collapsed = true" @expand="collapsed = false">
      <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
        :options="menuOptions">
      </n-menu>
    </n-layout-sider>
    <n-layout>
      <n-layout-header class="p-6" bordered>
        <NavBar />
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <slot />
      </n-layout-content>
      <n-layout-footer class="p-6 fixed bottom-0 left-0 right-0" bordered>
        <div class="text-center">copyright © jj</div>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { menuOptions } from '~/constants'
const activeKey = ref<string | null>(null);
const collapsed = ref(false);
</script>

<style scoped>
/*  */
</style>
