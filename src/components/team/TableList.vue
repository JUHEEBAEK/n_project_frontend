<template>
  <div>
     <v-row>
      <v-col cols="12">
        <v-radio-group v-model="teamType" row>
          <v-radio label="팀" value="Team"></v-radio>
          <v-radio label="유닛 팀" value="Unit"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="searchTeamResult"
          :loading="tableLoading"
          :footer-props="teamPaging"
          sort-by="name"
          hide-default-footer
          @click:row="movePage"
          class="elevation-1 table__team"
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card :loading="isLoading">
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
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"
              >fas fa-pencil-alt</v-icon
            >
            <v-icon small @click="deleteMember(item.id)">fas fa-trash-alt</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from "moment";
import util from "../../mixins/util.js";
import memberValue from "@/assets/value/member.json";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: teamMapState,
  mapMutations: teamMapMutations,
  mapActions: teamMapActions
} = createNamespacedHelpers("team");

export default {
  mixins: [util],
  data: () => ({
    teamType: "Team",
    menu: false,
    menu2: false,
    dialog: false,
    isLoading: false,
    unitTeamList: [],
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name"
      },
      { text: "Actions", value: "actions", sortable: false, align: "center" }
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
    },
    defaultItem: {
      name: "",
    },
    teamPaging: { "items-per-page-options": [10000] },
    tableLoading: false
  }),
  computed: {
    ...teamMapState(["searchTeamResult"]),
    formTitle() {
      return this.editedIndex === -1 ? "팀 추가" : "팀 정보 수정";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  mounted() {
    this.tableLoading = true;
    this.loadTeamList();
    this.loadUnitTeamList();
    this.tableLoading = false;
  },
  methods: {
    ...teamMapMutations(["SET_SEARCH_TEAM_RESULT"]),
    ...teamMapActions([
      "select_all_team"
    ]),
    async deleteTeam(team_id) {
      let formData = { team_id: team_id };
      if (confirm("정말 정말로 삭제하시겠습니까??")) {
        await this.delete_team(formData);
        this.select_all_team();
      }
    },
    editItem(item) {
      this.editedIndex = this.searchTeamResult.indexOf(item);
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
    save: async function(editedItem) {
      this.isLoading = true;
      let formData = { team_id: editedItem.id, team: editedItem };
      const result = await this.update_team(formData);
      console.log(result.status);
      switch (result.status) {
        case 200:
          this.$emit("setSnackBar", "showSuccess", "정상적으로 수정되었습니다");
          break;
        case 401:
          this.$emit("setSnackBar", "showFail", "인증 실패");
          break;
        case 500:
          this.$emit("setSnackBar", "showFail", "서버 에러");
          break;
        default:
          this.$emit("setSnackBar", "showFail", "네트워크 에러");
          break;
      }
      this.isLoading = false;

      this.select_all_team();
      this.close();
    },
    loadTeamList: async function() {
      await this.select_all_team();
      this.setAllTeamList(this.searchTeamResult);
    },
    loadUnitTeamList: function() {
      this.unitTeamList = [];
    },
    movePage(teamInfo) {
      this.$router.push({
        name: "teamDetails",
        params: { memberId: teamInfo.idTeam }
      });
    },
    setAllTeamList(teamList) {
      this.SET_SEARCH_TEAM_RESULT(teamList);
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
