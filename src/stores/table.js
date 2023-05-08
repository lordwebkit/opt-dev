import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTableStore = defineStore('table', () => {
  const columns = ref([
    { title: 'Номер', field: 'number', width: 100 },
    { title: 'Дата', field: 'date', width: 100 },
    { title: 'Наименование еденицы', field: 'unitName', width: 100 },
    { title: 'Цена', field: 'price', width: 100 },
    { title: 'Кол-во', field: 'quantity', width: 100 },
    { title: 'Название товара', field: 'productName', width: 100 },
    { title: 'Итого', field: 'total', width: 100 }
  ])
  const rows = ref(null)

  async function getProducts() {
    try {
      const response = await [
        {
          number: 1,
          date: '05.05.2023',
          unitName: 'Мраморный щебень фр. 2-5 мм, 25кг',
          price: '1231',
          quantity: '12',
          productName: 'Мраморный щебень',
          total: '14772'
        },
        {
          number: 2,
          date: '05.05.2023',
          unitName: 'Мраморный щебень фр. 2-5 мм, 25кг',
          price: '1231',
          quantity: '12',
          productName: 'Мраморный щебень',
          total: '14772'
        },
        {
          number: 3,
          date: '05.05.2023',
          unitName: 'Мраморный щебень фр. 2-5 мм, 25кг',
          price: '1231',
          quantity: '12',
          productName: 'Мраморный щебень',
          total: '14772'
        },
        {
          number: 4,
          date: '05.05.2023',
          unitName: 'Мраморный щебень',
          price: '1231',
          quantity: '12',
          productName: 'Мраморный щебень',
          total: '14772'
        }
      ]
      rows.value = response
    } catch (e) {
      console.error(e)
    }
  }
  return { columns, rows, getProducts }
})
