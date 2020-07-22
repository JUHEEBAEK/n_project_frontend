<template>
  <v-data-table
    :headers="headers"
    :items="searchResult"
    :loading="tableLoading"
    :footer-props="memberPaging"
    sort-by="name"
    hide-default-footer
    class="elevation-1 table__member"
  >
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
                  <v-text-field
                    v-model="editedItem.name"
                    label="이름"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        label="입단일"
                        hide-details
                        readonly
                        prepend-icon="fas fa-calendar-alt"
                        :value="editedItem.join_date"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="editedItem.join_date"
                      @input="menu2 = false"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="editedItem.uniform_number"
                    label="등번호"
                    hide-details
                    :items="uniform_number_not_used_list"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.nick_name"
                    label="닉네임"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="number"
                    min="1"
                    max="3"
                    v-model="editedItem.grade"
                    label="등급"
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
                        label="탈퇴날짜"
                        hide-details
                        clearable
                        readonly
                        prepend-icon="fas fa-calendar-alt"
                        :value="editedItem.withdraw_date"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="editedItem.withdraw_date"
                      @input="menu = false"
                    />
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save(editedItem)"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"
        >fas fa-pencil-alt</v-icon
      >
      <v-icon small @click="deleteMember(item.id)">fas fa-trash-alt</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import moment from "moment";
import util from "../../mixin/util.js";
import memberValue from "../../assets/value/member.json";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: memberMapState,
  mapMutations: memberMapMutations,
  mapActions: memberMapActions
} = createNamespacedHelpers("member");

export default {
  computed: {
    ...memberMapState(["searchResult"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    uniform_number_not_used_list() {
      let number_list_1to99 = [];
      number_list_1to99.push("");
      for (let i = 1; i < 100; i++) {
        number_list_1to99.push(i);
      }
      for (let i in this.searchResult) {
        let id_used = Number(this.searchResult[i]["uniform_number"]);
        let idx = number_list_1to99.indexOf(id_used);
        if (idx > -1) number_list_1to99.splice(idx, 1);
      }
      // 자기 번호 다시 넣어주기
      number_list_1to99.push(this.editedItem.uniform_number);

      return number_list_1to99;
    }
  },
  mixins: [util],
  async mounted() {
    this.tableLoading = true;
    await this.select_all_member();
    this.setAllMemberList(this.searchResult);
    this.tableLoading = false;
  },
  data: () => ({
    menu: false,
    menu2: false,
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
    editedIndex: -1,
    editedItem: {
      name: "",
      grade: 0,
      uniform_number: 0,
      withdraw_date: null
    },
    defaultItem: {
      name: "",
      grade: 0,
      uniform_number: 0,
      withdraw_date: null
    },
    memberPaging: { "items-per-page-options": [10000] },
    tableLoading: false
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    ...memberMapMutations(["SET_SEARCH_RESULT"]),
    ...memberMapActions([
      "select_all_member",
      "update_member",
      "delete_member"
    ]),
    async deleteMember(member_id) {
      let formData = { member_id: member_id };
      if (confirm("정말 정말로 삭제하시겠습니까??")) {
        await this.delete_member(formData);
        this.select_all_member();
      }
    },
    editItem(item) {
      this.editedIndex = this.searchResult.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.editedItem.grade = memberValue["gradeNumber"][item.grade];
      this.editedItem.uniform_number = Number(item.uniform_number);
      console.log(this.editedItem.grade);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save(editedItem) {
      let formData = { member_id: editedItem.id, member: editedItem };
      this.update_member(formData);

      this.setSnackBar(this.snackBarSuccess, "정상적으로 수정되었습니다");
      this.select_all_member();
      this.close();
    },
    setAllMemberList(memberList) {
      memberList.forEach(element => {
        element.grade = memberValue["gradeName"][element.grade];
      });
      this.SET_SEARCH_RESULT(memberList);
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
