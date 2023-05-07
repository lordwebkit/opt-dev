<script setup>
import { ref, computed } from 'vue'
const columns = ref([
  { title: 'Номер', field: 'number', width: 100 },
  { title: 'Дата', field: 'date', width: 100 },
  { title: 'Наименование еденицы', field: 'unitName', width: 100 },
  { title: 'Цена', field: 'price', width: 100 },
  { title: 'Кол-во', field: 'quantity', width: 100 },
  { title: 'Название товара', field: 'productName', width: 100 },
  { title: 'Итого', field: 'total', width: 100 }
])
const rows = ref([
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
])
let isDragging = ref(false)
let dragStartX = ref(null)
let resizingColumnIndex = ref(null)
let resizingStartX = ref(null)
let resizingStartWidth = ref(null)
let scrollLeft = ref(0)
let tableWidth = computed(() => columns.value.reduce((acc, column) => acc + column.width, 0))
let draggingColumnIndex = ref(null)
let draggingColumnPosition = ref(null)
let startCursorPosition = ref(null)
const tableWrapper = ref(null)

function startDrag(event) {
  isDragging.value = true
  dragStartX.value = event.clientX
  scrollLeft.value = tableWrapper.value.scrollLeft
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
}

function handleDrag(event) {
  if (isDragging.value) {
    const deltaX = event.clientX - dragStartX.value
    tableWrapper.value.scrollLeft = scrollLeft.value - deltaX
  }
}

function stopDrag() {
  isDragging.value = false
  dragStartX.value = null
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
}

function startResize(event, index) {
  resizingColumnIndex.value = index
  resizingStartX.value = event.clientX
  resizingStartWidth.value = columns.value[index].width
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
}

function handleResize(event) {
  if (resizingColumnIndex.value !== null) {
    const deltaX = event.clientX - resizingStartX.value
    columns.value[resizingColumnIndex.value].width = Math.max(resizingStartWidth.value + deltaX, 50)
  }
}

function stopResize() {
  resizingColumnIndex.value = null
  resizingStartWidth.value = null
  resizingStartX.value = null
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
}

function startDragAndDrop(event, index) {
  if (resizingColumnIndex.value === null) {
    draggingColumnIndex.value = index
    startCursorPosition.value = event.clientX

    let draggingColumn = document.querySelectorAll('.tm-table__th')[index]
    draggingColumnPosition.value = draggingColumn.getBoundingClientRect().x
    draggingColumn.style.position = 'absolute'
    draggingColumn.style.zIndex = 1000

    let nextColumn = document.querySelectorAll('.tm-table__th')[index + 1]
    if (nextColumn) {
      nextColumn.style.marginLeft = 100 + 'px'
    }

    document.addEventListener('mousemove', handleDragAndDrop)
    document.addEventListener('mouseup', stopDragAndDrop)
  }
}

function handleDragAndDrop(event) {
  if (resizingColumnIndex.value === null) {
    let draggingColumn = document.querySelectorAll('.tm-table__th')[draggingColumnIndex.value]
    let tablePosition = document.querySelector('.tm-table').getBoundingClientRect().x
    let cursorPosition = event.clientX - (startCursorPosition.value - draggingColumnPosition.value)

    if (tablePosition < cursorPosition && tablePosition + tableWidth.value - 100 > cursorPosition) {
      draggingColumn.style.left = cursorPosition + 'px'
    }
  }
}

function stopDragAndDrop(event) {
  let draggingColumn = document.querySelectorAll('.tm-table__th')[draggingColumnIndex.value]
  let nextColumn = document.querySelectorAll('.tm-table__th')[draggingColumnIndex.value + 1]
  let stopCursorPosition = event.clientX - (startCursorPosition.value - draggingColumnPosition.value)

  if (stopCursorPosition - draggingColumnPosition.value > 51) {
    let draggingColumnOnIndex = Math.ceil((stopCursorPosition - draggingColumnPosition.value) / 100)
    let replacingColumnIndex = draggingColumnOnIndex + draggingColumnIndex.value
    if (replacingColumnIndex > 6) replacingColumnIndex = 6
    swapColumns(replacingColumnIndex)
  } else if (stopCursorPosition - draggingColumnPosition.value < -51) {
    let draggingColumnOnIndex = Math.ceil((draggingColumnPosition.value - stopCursorPosition) / 100)
    let replacingColumnIndex = draggingColumnIndex.value - draggingColumnOnIndex
    if (replacingColumnIndex > 6) replacingColumnIndex = 6
    swapColumns(replacingColumnIndex)
  }

  if (nextColumn) nextColumn.style.marginLeft = ''
  draggingColumn.style.position = ''
  draggingColumn.style.left = ''
  draggingColumn.style.zIndex = ''
  draggingColumnIndex.value = null
  draggingColumnPosition.value = null
  document.removeEventListener('mousemove', handleDragAndDrop)
  document.removeEventListener('mouseup', stopDragAndDrop)
}

function swapColumns(replacingColumnIndex) {
  const columnsCopy = [...columns.value]
  const temp = columnsCopy[replacingColumnIndex]
  columnsCopy[replacingColumnIndex] = columnsCopy[draggingColumnIndex.value]
  columnsCopy[draggingColumnIndex.value] = temp
  columns.value = columnsCopy
  console.log(replacingColumnIndex, draggingColumnIndex.value)
}
</script>

<template>
  <div class="tm-table-wrapper" ref="tableWrapper">
    <table class="tm-table" :style="{ width: tableWidth + 'px' }">
      <thead class="tm-table__head">
        <tr>
          <th class="tm-table__th" v-for="(column, index) in columns" :key="index" :style="{ width: column.width + 'px' }"
            @mousedown="startDragAndDrop($event, index)">
            {{ column.title }}
            <div class="tm-table__resize-border" @mousedown="startResize($event, index)"></div>
          </th>
        </tr>
      </thead>
      <tbody class="tm-table__body" @mousedown="startDrag($event)">
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td class="tm-table__td" v-for="(value, name, index) in row" :key="name" :style="[
            { width: columns.find((col) => col.field == name).width + 'px' },
            { zIndex: ++index }
          ]">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.tm-table {
  border-collapse: collapse;
  white-space: nowrap;
  width: auto;

  &__th,
  &__td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
    display: inline-block;
    position: relative;
    background-color: #fff;
    overflow: hidden;
  }

  &__th {
    position: relative;
    user-select: none;
  }

  &__resize-border {
    position: absolute;
    top: 0;
    right: -5px;
    bottom: 0;
    width: 10px;
    cursor: col-resize;
  }
}

.tm-table-wrapper {
  overflow-x: scroll;
}
</style>
