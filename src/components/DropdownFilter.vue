<template>
  <div class="d-flex">
    <div class="d-flex-item">
      <span class="title">{{ title }}</span>
      <FormAutocomplete v-model="multiCountryB" :options="countries" placeholder="Search term">
        <template slot-scope="row">{{row.item.title}}</template>
        <template slot="selected" slot-scope="row">{{row.item.title}}</template>
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
    title: String
  },
  data() {
    return {
      countries: [
        { uid: 'AU', title: 'Australia' },
        { uid: 'ID', title: 'Indonesia' },
        { uid: 'KR', title: 'South Korea' },
        { uid: 'NZ', title: 'New Zealand' },
      ],
      multiCountryB : [],
      // multiCountryB: [
      //   { uid: 'ID', title: 'Indonesia' },
      //   { uid: 'AU', title: 'Australia' },
      // ],
    };
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
</style>
