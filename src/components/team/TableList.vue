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
          :headers="selectedHeaders"
          :items="selectedList"
          :loading="tableLoading"
          :footer-props="teamPaging"
          sort-by="name"
          hide-default-footer
          @click:row="movePage"
          class="elevation-1 table__team"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon class="pa-2">
              <v-icon @click.stop.native="modifyTeam(item)">fas fa-pencil-alt</v-icon>
            </v-btn>
            <v-btn icon class="pa-2">
              <v-icon @click.stop.native="deleteTeam(tem)">fas fa-trash-alt</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <dialog-team-modify
      v-if="dialog === true && type === 'unitTeamModify'"
      :selectedTeam="clickedTeam"
    ></dialog-team-modify>
  </div>
</template>

<script>
import headerJson from "@/assets/value/header.json";

import dialog from "../../mixins/dialog.js";
import util from "../../mixins/util.js";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: teamMapState,
  mapMutations: teamMapMutations,
  mapActions: teamMapActions
} = createNamespacedHelpers("team");

export default {
  mixins: [dialog, util],
  data: () => ({
    menu: false,
    clickedTeam: {},
    dialog: false,
    isLoading: false,
    teamType: "Team",
    teamPaging: { "items-per-page-options": [10000] },
    tableLoading: false
  }),
  computed: {
    ...teamMapState(["searchTeamResult", "searchUnitTeamResult"]),
    formTitle() {
      return this.editedIndex === -1 ? "팀 추가" : "팀 정보 수정";
    },
    selectedList() {
      if(this.teamType === "Team") {
        return this.searchTeamResult;
      }else {
        return this.searchUnitTeamResult;
      }
    },
    selectedHeaders() {
      if(this.teamType === "Team") {
        return headerJson.teamHeaders;
      }else {
        return headerJson.unitTeamHeaders;
      }
    }
  },
  mounted() {
    this.tableLoading = true;
    this.loadTeamList();
    this.loadUnitTeamList();
    this.tableLoading = false;
  },
  methods: {
    ...teamMapMutations(["SET_SEARCH_TEAM_RESULT", "SET_SEARCH_UNIT_TEAM_RESULT"]),
    ...teamMapActions([
      "select_all_team",
      "select_unit_team"
    ]),
    deleteTeam(teamInfo) {
      console.log("delete", teamInfo.team_id);
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
    },
    loadTeamList: async function() {
      await this.select_all_team();
      this.setAllTeamList(this.searchTeamResult);
    },
    loadUnitTeamList: async function() {
      await this.select_unit_team();
      this.setUnitTeamList(this.searchUnitTeamResult);
    },
    modifyTeam: function (item) {
      console.log("1");
      if(this.teamType === "Unit") {
        console.log("2");
        console.log("modify", item);
        this.clickedTeam = item;
        this.setDialogAndType({ dialog: true, type: "unitTeamModify" });
      }
    },
    movePage(teamInfo) {
      console.log(teamInfo);
      if(this.teamType === "Unit") {
        this.$router.push({
          name: "unitTeamDetails",
          params: { teamId: teamInfo.id_unit_team }
        });
      }
    },
    setAllTeamList(teamList) {
      this.SET_SEARCH_TEAM_RESULT(teamList);
    },
    setUnitTeamList(teamList) {
      this.SET_SEARCH_UNIT_TEAM_RESULT(teamList);
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
