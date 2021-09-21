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
    <template v-if="accountType === 'A'" v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">fas fa-pencil-alt</v-icon>
      <v-icon small @click="deleteItem(item.id)">fas fa-trash-alt</v-icon>
    </template>
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
    },
    accountType: {
      type: String,
      required: true
    }
  },
  data: () => ({
    memberPaging: { "items-per-page-options": [10000] }
  }),
  methods: {
    editItem(item) {
      this.$emit("openEditDialog", item);
    },
    deleteItem(id) {
      this.$emit("clickedDeleteMember", id);
    }
  }
};
</script>

<style scoped>
.table__member {
  padding: 0;
  overflow-y: scroll;
  max-height: 520px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}
</style>
