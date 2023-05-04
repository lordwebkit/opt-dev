<script setup></script>
<template>
  <button class="o-btn">
    <slot></slot>
  </button>
</template>
<style lang="scss" scoped>
.o-btn {
  display: flex;
  align-items: center;
  padding: 10px 15px 10px 10px;
  border-radius: 5px;
  background-color: #2f8cff;
  font-family: MyriadPro;
  font-size: 14px;
  color: #fff;
}
</style>
