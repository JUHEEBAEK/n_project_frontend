<template>
  <v-data-table :headers="headers" :items="searchResult" sort-by="joinDate" class="elevation-1">
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">fas fa-pencil-alt</v-icon>
      <v-icon small @click="deleteItem(item)">fas fa-trash-alt</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import moment from "moment";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: memberMapState,
  mapActions: memberMapActions
} = createNamespacedHelpers("member");

export default {
  computed: {
    ...memberMapState(["searchResult"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  mounted() {
    console.log("????");
    this.select_all_member();
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name"
      },
      { text: "Join Date", value: "join_date", align: "center" },
      { text: "Uniform number", value: "uniform_number", align: "center" },
      { text: "Grage", value: "grade", align: "center" },
      { text: "Withdraw Date", value: "withdraw_date", align: "center" },
      { text: "Actions", value: "actions", sortable: false, align: "center" }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      join_date: 0,
      grade: 0,
      uniform_number: 0,
      withdraw_date: 0
    },
    defaultItem: {
      name: "",
      join_date: 0,
      grade: 0,
      uniform_number: 0,
      withdraw_date: 0
    }
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    ...memberMapActions(["select_all_member", "delete_member"]),

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteMember(member_id) {
      let formData = { member_id: member_id };
      if (confirm("정말 정말로 삭제하시겠습니까??")) {
        await this.delete_member(formData);
        this.select_member();
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style>
</style>