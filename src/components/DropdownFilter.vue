<template>
  <div class="d-flex">
    <div class="d-flex-item">
      <h4>Multi Select - with Scope Slot</h4>
      <FormAutocomplete v-model="multiCountryB" :options="countries" placeholder="please select country">
        <template slot-scope="row">{{row.item.title}}</template>
        <template slot="selected" slot-scope="row">{{row.item.title}}</template>
      </FormAutocomplete>
      <div>
        Selected country : <br/>
        <p v-for="(v, k) in multiCountryB" :key="k">
          uid: {{v.uid}} - title: {{v.title}}
        </p>
      </div>
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
  padding: 10px;
  border: 1px solid #eaeaea;
  margin: 0 20px 20px 0;
}
</style>
