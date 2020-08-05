<template>
  <div>
    <b>Panel Filter</b>
    <DropdownFilter title="Tasks / Projects"></DropdownFilter>
  </div>
</template>

<script>
import DropdownFilter from './DropdownFilter.vue'

export default {
  name: 'PanelFilter',
  props: {
    msg: String
  },
  components: {
    DropdownFilter
  }
}
</script>

<style scoped>

</style>
