<template>
  <v-data-table
    :headers="headers"
    :items="teamList"
    :loading="loading"
    :search="searchQuery"
    :footer-props="teamPaging"
    sort-by="name"
    hide-default-footer
    class="elevation-1"
    @click:row="movePage"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn v-if="teamType === 'unitTeam'" outlined class="pa-2 mx-3">
        <v-icon @click.stop.native="modifyTeam(item)">fas fa-pencil-alt</v-icon>
      </v-btn>
      <v-btn outlined class="pa-2">
        <v-icon @click.stop.native="deleteTeam(item)">fas fa-trash-alt</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    headers: Array,
    searchQuery: String,
    teamType: String,
    teamList: Array
  },
  data: () => ({
    teamPaging: { "items-per-page-options": [10000] }
  }),
  methods: {
    movePage(item) {
      this.$emit("moveDetails", item);
    },
    modifyTeam(item) {
      this.$emit("openModify", item);
    },
    deleteTeam(item) {
      if (this.teamType === "unitTeam") {
        this.$emit("deleteUnitTeam", item);
      } else {
        this.$emit("deleteTeam", item);
      }
    }
  }
};
</script>

<style scoped>
.table__member {
  overflow-y: auto;
  max-height: 600px;
}
</style>
