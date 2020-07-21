<template>
  <v-data-table :headers="headers" :items="searchResult" sort-by="joinDate" class="elevation-1">
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.name" label="name"></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.join_date" label="joinDate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.uniform_number" label="uniformNumber"></v-text-field>
                </v-col>-->
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="number"
                    min="1"
                    max="3"
                    v-model="editedItem.grade"
                    label="grade"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :v-model="editedItem.withdraw_date"
                        label="withdrawDate"
                        hide-details
                        prepend-icon="fas fa-calendar-alt"
                        :value="date"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker v-model="date" @input="menu = false" />
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">fas fa-pencil-alt</v-icon>
      <v-icon small @click="deleteMember(item)">fas fa-trash-alt</v-icon>
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
    menu: false,
    date: "",
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