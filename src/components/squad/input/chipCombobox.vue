<template>
  <v-combobox
    v-model="selectedItems"
    :items="items"
    item-text="name"
    chips
    clearable
    :label="label"
    :multiple="multiple"
    prepend-icon="mdi-filter-variant"
    solo
  >
    <template v-slot:selection="{ attrs, item, select, selected }">
      <v-chip
        v-bind="attrs"
        :input-value="selected"
        close
        @click="select"
        @click:close="remove(item)"
      >
        <strong>{{ item.name }}</strong>
      </v-chip>
    </template>
  </v-combobox>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "여러개 선택"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedItems: []
    };
  },
  watch: {
    selectedItems(value) {
      console.log("changed", value);
      this.$emit("input", value);
    },
    value: {
      immediate: true,
      handler: function(value) {
        this.selectedItems = value;
      }
    }
  },
  methods: {
    remove(item) {
      this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
      this.selectedItems = [...this.selectedItems];
    }
  }
};
</script>
