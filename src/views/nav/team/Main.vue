<template>
  <div class="team__container">
    <div class="team__header">
      <h3 class="mr-5">{{ title }}</h3>
      <v-btn class="mx-2" fab dark small color="primary" @click="toggleAddDialog(true)">
        <v-icon dark>fas fa-plus</v-icon>
      </v-btn>
    </div>
    <div class="team__content">
      <div class="content__top">
        <v-select class="input__select" v-model="teamType" :items="teamTypes" dense outlined hide-details />
        <search-table-filter class="search__filter" label="이름으로 검색" @setSearchQuery="setSearchQuery" />
      </div>

      <data-table-team
        :loading="tableLoading"
        :headers="headers"
        :teamList="items"
        :searchQuery="searchQuery"
        :teamType="teamType"
        @moveDetails="updateRouter"
        @openModify="toggleDialog"
        @deleteTeam="removeTeam"
        @deleteUnitTeam="removeUnitTeam"
      />
    </div>
    <dialog-team-add :dialog="addDialog" @closeDialog="toggleAddDialog" />
    <dialog-team-modify
      :dialog="dialogProps.value"
      :selectedTeam="dialogProps.item"
      @closeDialog="toggleDialog"
      @setLoadingBar="setLoadingBar"
    />
    <req-loading :loading="loading" :size="100" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import headerJson from "@/assets/value/header.json";

import Loading from "@/components/loading";
import SearchTableFilter from "@/components/search/TableFilter.vue";
import DataTableTeam from "@/components/team/TableList.vue";
import DialogAdd from "@/components/dialog/team/Add.vue";
import DialogModify from "@/components/dialog/team/Modify.vue";

export default {
  components: {
    "req-loading": Loading,
    "search-table-filter": SearchTableFilter,
    "data-table-team": DataTableTeam,
    "dialog-team-add": DialogAdd,
    "dialog-team-modify": DialogModify
  },
  data: () => ({
    teamType: "unitTeam",
    teamTypes: [
      { text: "팀", value: "team" },
      { text: "유닛 팀", value: "unitTeam" }
    ],
    loading: false,
    title: "팀 관리",
    searchQuery: "",
    tableLoading: false,
    addDialog: false,
    dialogProps: {
      value: false,
      item: {}
    }
  }),
  computed: {
    ...mapGetters("team", ["teamList"]),
    ...mapGetters("unitTeam", ["unitTeamList"]),
    formTitle() {
      return this.editedIndex === -1 ? "팀 추가" : "팀 정보 수정";
    },
    headers() {
      if (this.teamType === "team") {
        return headerJson.teamHeaders;
      } else {
        return headerJson.unitTeamHeaders;
      }
    },
    items() {
      if (this.teamType === "team") {
        return this.teamList;
      } else {
        return this.unitTeamList;
      }
    }
  },
  created() {
    this.tableLoading = true;
    this.loadTeamList();
    this.loadUnitTeamList();
    this.tableLoading = false;
  },
  methods: {
    ...mapActions("team", ["getTeamList", "deleteTeam"]),
    ...mapActions("unitTeam", ["getUnitTeamList", "deleteUnitTeam"]),
    async loadTeamList() {
      await this.getTeamList();
    },
    async loadUnitTeamList() {
      await this.getUnitTeamList();
    },
    setSearchQuery(value) {
      this.searchQuery = value;
    },
    moveTeamAdd() {
      this.$router.push("/teamAdd");
    },
    removeTeam: async function(teamInfo) {
      this.tableLoading = true;
      const { idTeam } = teamInfo;
      if (confirm("정말로 삭제하시겠습니까??")) {
        await this.deleteTeam(idTeam);
      }
      this.tableLoading = false;
    },
    removeUnitTeam: async function(teamInfo) {
      this.tableLoading = true;
      const { id_unit_team } = teamInfo;
      if (confirm("정말로 삭제하시겠습니까??")) {
        await this.deleteUnitTeam(id_unit_team);
      }
      this.tableLoading = false;
    },
    toggleAddDialog(value) {
      this.addDialog = value;
    },
    toggleDialog(item) {
      this.dialogProps = {
        value: item ? true : false,
        item
      };
    },
    updateRouter(teamInfo) {
      if (this.teamType === "unitTeam") {
        this.$router.push({
          name: "unitTeamDetails",
          params: { teamId: teamInfo.id_unit_team }
        });
      }
    },
    setLoadingBar(value) {
      this.loading = value;
    }
  }
};
</script>

<style scoped lang="scss">
.team__container {
  display: flex;
  flex-direction: column;
  padding: 24px;
  .team__header {
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .team__content {
    width: 100%;
    padding: 12px;

    .content__top {
      display: flex;
      align-items: center;
    }
    .input__select {
      max-width: 12%;
      margin-right: 12px;
      height: 34px;
    }
    .search__filter {
      margin: 12px 0;
      max-width: 30%;
    }
  }
}
</style>
