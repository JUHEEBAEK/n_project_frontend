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
      this.$emit("openEditDialog", true, item);
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
  overflow-y: auto;
  max-height: 600px;
}
</style>
