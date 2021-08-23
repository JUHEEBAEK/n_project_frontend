<template>
  <v-data-table
    class="table__member"
    :headers="headers"
    :items="items"
    :loading="tableLoading"
    :footer-props="memberPaging"
    :search="searchQuery"
    sort-by="name"
    hide-default-footer
  >
  </v-data-table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    searchQuery: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    memberPaging: { "items-per-page-options": [10000] }
  })
};
</script>

<style scoped>
.table__member {
  padding: 0;
  overflow-y: auto;
  max-height: 600px;
}
</style>
