<template>
  <div class="form-autocomplete">
    <div>
      <div class="items-selected">
        <div class="item-selected" v-for="(v, k) in value" :key='v.uid'>
          <slot name="selected" :item="v">{{v.uid}} - {{v.title}}</slot> <button @click="removeItem(k)">remove</button>
        </div>
      </div>
      <input v-model="textSearch" type="text" :placeholder="placeholder"/>
      <ul>
        <li v-for="item in filteredOptions" :key='item.title' @click="addItem(item)">
          <slot :item="item">{{item.title}}</slot>
        </li>
        <li v-if="filteredOptions.length===0">Item not found</li>
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
      default: '',
    },
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
      return this.options.filter(val => val.title.toLowerCase().includes(this.textSearch.toLowerCase()) && !this.inSelectedItems(val.uid));
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
  padding: 10px;
  background: #eaeaea;
}

ul {
  width: 200px;
  padding-left: 0;
}
ul > li {
  cursor: pointer;
  list-style: none;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid white;
  background: #dedede;
}
ul > li:hover {
  background: #313131;
  color: white;
}

.items-selected {
  margin-top: 20px;
}
.item-selected {
  border-radius: 5px;
  display: inline-block;
  padding: 5px;
  background: #7b8fdc;
  color: white;
  margin: 0 5px 10px 0;
}
</style>
