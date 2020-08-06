<template>
  <div class="d-flex">
    <div class="d-flex-item">
      <span class="title">{{ title }}</span>
      <FormAutocomplete v-model="selectedItems" :options="items" placeholder="Search term" :loading="loading">
        <template slot-scope="row">{{row.item.title}} <span class="subtitle">{{ row.item.subtitle }}</span></template>
        <template slot="selected" slot-scope="row">{{row.item.title}} <span class="subtitle">{{ row.item.subtitle }}</span></template>
      </FormAutocomplete>
    </div>
  </div>
</template>

<script>
import FormAutocomplete from './FormAutocomplete.vue'

export default {
  name: 'DropdownFilter',
  components: {
    FormAutocomplete
  },
  props: {
    title: String,
    preLoad: Array,
    items: Array,
    loading: Boolean
  },
  data() {
    return {
      selectedItems: this.preLoad
    };
  },
  watch: {
    selectedItems: function() {
      this.$emit("selectedItemsChange", this.selectedItems);
    }
  }
}
</script>

<style scoped>
.d-flex {
  display: flex;
  flex-wrap: wrap;
}
.d-flex-item {
  width: 300px;
  padding: 5px;
  border: 1px solid #eaeaea;
  margin: 10px 10px 10px 10px;
  background-color: #eaeaea;
}
.title {
  padding-left: 7px;
}
.subtitle {
  font-size: 10px;
}
</style>
