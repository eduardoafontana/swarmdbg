<template>
  <div class="form-autocomplete">
    <div>
      <div class="items-selected">
        <div class="item-selected" v-for="(v, k) in value" :key='v.uid'>
          <slot name="selected" :item="v"></slot>
          <div class="button-x"><b-icon class="x-selected" @click="removeItem(k)" icon="x-circle-fill"></b-icon></div>
        </div>
      </div>
      <b-input-group class="input-search" size="sm">
        <b-input-group-prepend is-text>
          <b-icon icon="search"></b-icon>
        </b-input-group-prepend>
        <b-form-input type="search" v-model="textSearch" :placeholder="placeholder"></b-form-input>
      </b-input-group>
      <ul>
        <li v-for="item in filteredOptions" :key='item.title' @click="addItem(item)">
          <slot :item="item"></slot>
        </li>
        <li v-if="filteredOptions.length===0">No items to show</li>
        <li v-if="loading">Loading <b-icon icon="three-dots" animation="cylon"></b-icon></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormAutocomplete',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    loading: Boolean,
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: [Object, Array],
      default() {
        return {
          uid: undefined,
          title: undefined,
          subtitle: undefined,
        };
      },
    },
  },
  data() {
    return {
      textSearch: ''
    };
  },
  computed: {
    filteredOptions() {
      return this.options.filter(val => 
        ( val.title.toLowerCase().includes(this.textSearch.toLowerCase()) 
          || val.subtitle.toLowerCase().includes(this.textSearch.toLowerCase()) )
        && !this.inSelectedItems(val.uid));
    },
    selectedItems() {
      return this.value.map(v => v.uid);
    },
  },
  methods: {
    inSelectedItems(uid) {
      return this.selectedItems.includes(uid);
    },
    addItem(item) {
      if (!this.inSelectedItems(item.uid)) {
        const items = JSON.parse(JSON.stringify(this.value));
        items.push(item);
        this.$emit('input', items);
        this.$emit('onAddItem', items);
      }
    },
    removeItem(index) {
      const items = JSON.parse(JSON.stringify(this.value));
      items.splice(index, 1);
      this.$emit('input', items);
      this.$emit('onRemoveItem', items);
    },
  }
}
</script>

<style scoped>
.form-autocomplete {
  padding: 7px 7px 0px 7px;
  background: #eaeaea;
}

ul {
  margin-top: 7px;
  padding-left: 0;
  max-height: 150px;
  overflow: auto;
}
ul > li {
  cursor: pointer;
  list-style: none;
  padding: 3px 5px 3px 5px;
  margin-bottom: 5px;
  background:darkgrey;
  color: white;
}
ul > li:hover {
  background: #313131;
  color: white;
}

.items-selected{
  margin-bottom: 5px;
}
.item-selected {
  display: inline-block;
  background:darkgrey;
  border-radius: 3px;
  padding: 3px 7px 3px 5px;
  color: white;
  margin: 3px 3px 3px 0;
  font-size: 12px;
}
.x-selected:hover {
  color: #313131;
  cursor: pointer;
}
.button-x {
  float: right;
  margin-left: 6px;
}

.input-search {
  display: flex;
}
</style>
