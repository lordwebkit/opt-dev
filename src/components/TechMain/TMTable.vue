<script setup>
import { ref, computed } from 'vue'
import { useTableStore } from '@/stores/table'

const store = useTableStore()
store.getProducts()

// Scrolling Table X

const tableWrapper = ref(null)
let scrollStartX = ref(null)
let scrollLeft = ref(0)

function startScrollTable(event) {
  scrollStartX.value = event.clientX
  scrollLeft.value = tableWrapper.value.scrollLeft
  document.addEventListener('mousemove', handleScrollTable)
  document.addEventListener('mouseup', stopScrollTable)
}

function handleScrollTable(event) {
  const deltaX = event.clientX - scrollStartX.value
  tableWrapper.value.scrollLeft = scrollLeft.value - deltaX
}

function stopScrollTable() {
  scrollStartX.value = null
  document.removeEventListener('mousemove', handleScrollTable)
  document.removeEventListener('mouseup', stopScrollTable)
}

// Resizing Table X

let tableWidth = computed(() => store.columns.reduce((acc, column) => acc + column.width, 0))
let resizeColumnIndex = ref(null)
let resizeColumnWidth = ref(null)
let resizeStartX = ref(null)

function startResizeColumn(event, index) {
  resizeColumnIndex.value = index
  resizeStartX.value = event.clientX
  resizeColumnWidth.value = store.columns[index].width
  document.addEventListener('mousemove', handleResizeColumn)
  document.addEventListener('mouseup', stopResizeColumn)
}

function handleResizeColumn(event) {
  const deltaX = event.clientX - resizeStartX.value
  store.columns[resizeColumnIndex.value].width = Math.max(resizeColumnWidth.value + deltaX, 50)
}

function stopResizeColumn() {
  resizeColumnIndex.value = null
  resizeColumnWidth.value = null
  resizeStartX.value = null
  document.removeEventListener('mousemove', handleResizeColumn)
  document.removeEventListener('mouseup', stopResizeColumn)
}

// Drag and drop columns

let dragColumnIndex = ref(null)
let dragColumnPosition = ref(null)
let dragStartX = ref(null)
let tableHeaders = ref(null)
let tableData = ref(null)

function startDragAndDrop(event, index) {
  if (resizeColumnIndex.value === null) {
    dragColumnIndex.value = index
    dragStartX.value = event.clientX

    const draggingColumn = tableHeaders.value[index]
    dragColumnPosition.value = draggingColumn.getBoundingClientRect().x
    Object.assign(draggingColumn.style, {
      position: 'absolute',
      zIndex: 1000
    })

    const draggingData = tableData.value.filter(
      (data) => data.dataset.name === draggingColumn.dataset.field
    )
    draggingData.forEach((data) => {
      Object.assign(data.style, {
        position: 'absolute',
        zIndex: 1000
      })
    })

    if (dragColumnIndex.value < tableHeaders.value.length - 1) {
      const nextColumn = tableHeaders.value[index + 1]
      const nextData = tableData.value.filter(
        (data) => data.dataset.name === nextColumn.dataset.field
      )
      Object.assign(nextColumn.style, {
        marginLeft: '100px'
      })
      nextData.forEach((data) => {
        Object.assign(data.style, {
          marginLeft: '100px'
        })
      })
    }

    document.addEventListener('mousemove', handleDragAndDrop)
    document.addEventListener('mouseup', stopDragAndDrop)
  }
}

function handleDragAndDrop(event) {
  const draggingColumn = tableHeaders.value[dragColumnIndex.value]
  const draggingData = tableData.value.filter(
    (data) => data.dataset.name === draggingColumn.dataset.field
  )
  let tablePosition = document.querySelector('.tm-table').getBoundingClientRect().x
  const deltaX = dragStartX.value - dragColumnPosition.value
  let cursorPosition = event.clientX - deltaX

  if (tablePosition < cursorPosition && tablePosition + tableWidth.value - 100 > cursorPosition) {
    draggingColumn.style.left = cursorPosition + 'px'
    draggingData.forEach((data) => {
      data.style.left = cursorPosition + 'px'
    })
  }
}

function stopDragAndDrop(event) {
  const draggingColumn = tableHeaders.value[dragColumnIndex.value]
  const draggingData = tableData.value.filter(
    (data) => data.dataset.name === draggingColumn.dataset.field
  )
  const stopCursorPosition = event.clientX - (dragStartX.value - dragColumnPosition.value)

  if (stopCursorPosition - dragColumnPosition.value > 51) {
    let draggingColumnOnIndex = Math.ceil((stopCursorPosition - dragColumnPosition.value) / 100)
    let replacingColumnIndex = draggingColumnOnIndex + dragColumnIndex.value
    if (replacingColumnIndex > 6) replacingColumnIndex = 6
    swapColumns(replacingColumnIndex)
  } else if (stopCursorPosition - dragColumnPosition.value < -51) {
    let draggingColumnOnIndex = Math.ceil((dragColumnPosition.value - stopCursorPosition) / 100)
    if (draggingColumnOnIndex > 6) draggingColumnOnIndex = 6
    const replacingColumnIndex = dragColumnIndex.value - draggingColumnOnIndex
    swapColumns(replacingColumnIndex)
  }

  if (dragColumnIndex.value < tableHeaders.value.length - 1) {
    const nextColumn = tableHeaders.value[dragColumnIndex.value + 1]
    const nextData = tableData.value.filter(
      (data) => data.dataset.name === nextColumn.dataset.field
    )
    nextColumn.style.marginLeft = ''
    nextData.forEach((data) => {
      data.style.marginLeft = ''
    })
  }
  Object.assign(draggingColumn.style, {
    position: '',
    left: '',
    zIndex: ''
  })
  draggingData.forEach((data) => {
    Object.assign(data.style, {
      position: '',
      left: '',
      zIndex: ''
    })
  })
  dragColumnIndex.value = null
  dragColumnPosition.value = null
  document.removeEventListener('mousemove', handleDragAndDrop)
  document.removeEventListener('mouseup', stopDragAndDrop)
}

function swapColumns(replacingColumnIndex) {
  const columnsCopy = [...store.columns]
  const temp = columnsCopy[replacingColumnIndex]
  columnsCopy[replacingColumnIndex] = columnsCopy[dragColumnIndex.value]
  columnsCopy[dragColumnIndex.value] = temp
  const rowsCopy = [...store.rows].map((row) => {
    const obj = {}
    columnsCopy.forEach((column) => {
      obj[column.field] = row[column.field]
    })
    return obj
  })
  store.columns = columnsCopy
  store.rows = rowsCopy
}
</script>

<template>
  <div class="tm-table-wrapper" ref="tableWrapper">
    <table class="tm-table" :style="{ width: tableWidth + 'px' }">
      <thead class="tm-table__head">
        <tr>
          <th class="tm-table__th" ref="tableHeaders" :data-field="column.field" v-for="(column, index) in store.columns"
            :key="index" :style="{ width: column.width + 'px' }" @mousedown="startDragAndDrop($event, index)">
            {{ column.title }}
            <div class="tm-table__resize-border" @mousedown="startResizeColumn($event, index)"></div>
          </th>
        </tr>
      </thead>
      <tbody class="tm-table__body" @mousedown="startScrollTable($event)">
        <tr v-for="(row, rowIndex) in store.rows" :key="rowIndex">
          <td class="tm-table__td" ref="tableData" :data-name="name" v-for="(value, name, index) in row" :key="index"
            :style="[
              { width: store.columns.find((col) => col.field == name).width + 'px' },
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
  user-select: none;
}
</style>
