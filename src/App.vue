<script setup>
import { RouterView } from 'vue-router'
import NavSideBar from './components/NavSideBar.vue'
</script>

<template>
  <div class="app">
    <div class="app-inner">
      <NavSideBar />
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-inner {
  display: flex;
}
</style>
