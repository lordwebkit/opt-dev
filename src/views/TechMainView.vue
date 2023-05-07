<script setup>
// import {ref} from 'vue'
import Obtn from '@/components/OBtn.vue'
import TMTable from '@/components/TechMain/TMTable.vue'
// import TMTable2 from '@/components/TechMain/TMTable2.vue'
// const columns = ref([
//   { title: "Номер", field: 'number', width: 100 },
//   { title: "Дата", field: 'date', width: 100 },
//   { title: "Наименование еденицы", field: 'unitName', width: 100 },
//   { title: "Цена", field: 'name', width: 100 },
//   { title: "Кол-во", field: 'quantity', width: 100 },
//   { title: "Название товара", field: 'productName', width: 100 },
//   { title: "Итого", field: 'total', width: 100 },
// ])
</script>

<template>
  <div class="tech-main">
    <h1 class="tech-main__title title">Проведение ТО и мелкий ремонт</h1>
    <nav class="tech-main__nav">
      <router-link class="tech-main__link link" to="/">Общее</router-link>
      <router-link class="tech-main__link link link--active" to="/"> Товар списания </router-link>
      <router-link class="tech-main__link link" to="/">Доп. расходы</router-link>
    </nav>
    <div class="tech-main__add-row tm-add-row">
      <Obtn><i class="tm-add-row__icon"></i>Добавить строку</Obtn>
    </div>
    <div class="tech-main__content tm-content">
      <div class="tm-content__setting">
        <button class="tm-content__setting-icon"></button>
      </div>
      <div class="tm-content__table">
        <TMTable />
        <!-- <TMTable2 /> -->
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tech-main {
  background-color: #fbfcfd;
  width: calc(100% - 229px);
  padding: 25px;

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
    margin-bottom: 25px;
  }
}

.tm-add-row {
  &__icon {
    background: url('@/assets/icon/buttonPlus.svg') no-repeat center center;
    background-size: cover;

    width: 11px;
    height: 11px;
    margin-right: 7px;
    display: inline-block;
  }
}

.tm-content {
  width: 100%;
  height: 453px;
  padding: 9px 1px 25px;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  border: solid 1px #eeeff1;
  background-color: #fff;

  &__setting {
    display: flex;
    justify-content: flex-end;
    padding-right: 15px;
  }

  &__setting-icon {
    width: 15px;
    height: 15px;
    background: url('@/assets/icon/combinedShape.svg') no-repeat center center;
    background-size: cover;
    margin-bottom: 8px;
  }
}
</style>
