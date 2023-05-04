<script setup>
import Obtn from '@/components/OBtn.vue'
</script>

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
      <div class="tech-maintenance__add-row tm-add-row">
        <Obtn><i class="tm-add-row__icon"></i>Добавить строку</Obtn>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tech-maintenance {
  background-color: #fbfcfd;
  width: calc(100% - 229px);

  &__title {
    margin-bottom: 25px;
  }

  &__nav {
    display: flex;
    justify-content: space-between;
    width: 301px;
    margin-bottom: 25px;
  }

  &__add-row {
    padding: 25px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
    border: solid 1px #eeeff1;
    background-color: #fff;
  }
}

.tech-maintenance-inner {
  padding: 25px;
}

.tm-add-row {
  &__icon {
    background: url('../assets/icon/buttonPlus.svg') no-repeat center center;
    background-size: cover;

    width: 11px;
    height: 11px;
    margin-right: 7px;
    display: inline-block;
  }
}
</style>
