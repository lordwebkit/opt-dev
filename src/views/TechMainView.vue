<script setup></script>

<template>
  <div class="tech-maintenance">
    <div class="tech-maintenance-inner">
      <h1 class="tech-maintenance__title title">Проведение ТО и мелкий ремонт</h1>
      <nav class="tech-maintenance__nav">
        <router-link class="tech-maintenance__link link" to="/">Общее</router-link>
        <router-link class="tech-maintenance__link link link--active" to="/">
          Товар списания
        </router-link>
        <router-link class="tech-maintenance__link link" to="/">Доп. расходы</router-link>
      </nav>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tech-maintenance {
  background-color: #fbfcfd;
  width: 100%;
  &__title {
    margin-bottom: 25px;
  }
  &__nav {
    display: flex;
    justify-content: space-between;
    width: 301px;
    margin-bottom: 25px;
  }
}
.tech-maintenance-inner {
  padding: 25px;
}
</style>
