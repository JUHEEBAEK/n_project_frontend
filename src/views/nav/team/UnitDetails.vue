<template>
  <div>
    <div class="main__title">
      <core-breadcrumbs :items="items" />
    </div>
    <div class="main__header">
      <div class="player__list">
        <div class="player__item" v-for="item in unitTeamPlayerList" :key="item">
          <div class="item__badge" v-if="isActive">
            <v-btn class="badge__button" fab color="error" x-small @click="deleteMember(item)">
              <v-icon x-small class="fas fa-times"></v-icon>
            </v-btn>
          </div>
          <v-avatar class="ma-3" color="teal">
            <span class="white--text headline">{{ showTwoChar(item.name) }}</span>
          </v-avatar>
          <!-- <v-avatar v-else class="ma-1" color="teal">
            <span class="white--text headline">{{ showTwoChar(item.name) }}</span>
          </v-avatar> -->
        </div>
        

        <v-btn icon snallclass="white--text" @click="addUnitPlayer">
          <v-icon class="fas fa-plus"></v-icon>
        </v-btn>
      </div>
      <v-btn icon @click="activeLock">
        <v-icon v-if="isActive" class="fas fa-lock-open"></v-icon>
        <v-icon v-else class="fas fa-lock"></v-icon>
      </v-btn>
      
    </div>
    <div class="main__content">
      <div class="main__left"></div>
      <div class="main__right"></div>
    </div>

    <dialog-member-add-unit-member
      v-if="dialog === true && type === 'addUnitMember'"
      :unit_team_id="unit_team_id"
      @reloadUnitTeamMember="loadUnitTeamMember"
      @setSnackBar="setSnackBar"
      @setLoadingBar="setLoadingBar"
    />
  </div>
</template>

<script>
import dialog from "../../../mixins/dialog.js";

import { createNamespacedHelpers, mapActions } from "vuex";
const {
  mapState: unitMemberMapState,
  mapActions: unitMemberMapActions,
} = createNamespacedHelpers("unitMember");

export default {
  mixins: [dialog],
  data: () => ({
    isActive: false,
    items: [
      {
        text: "팀 관리",
        disabled: false,
        href: "/team-admin",
      },
      {
        text: "유닛 팀 상세 정보",
        disabled: true,
      }
    ],
    unit_team_id: ""
  }),
  computed: {
    ...unitMemberMapState(["unitTeamPlayerList"])
  },
  created() {
    this.unit_team_id = this.$route.params.teamId;
    this.loadUnitTeamMember();
  },
  methods: {
    ...unitMemberMapActions(["select_unit_team_member"]),
    addUnitPlayer: function() {
      this.setDialogAndType({ dialog: true, type: "addUnitMember" })
    },
    deleteMember(item) {
      console.log("delete", item);
    },
    loadUnitTeamMember() {
      this.select_unit_team_member(this.unit_team_id);
    },
    activeLock() {
      this.isActive = !this.isActive;
    },
    showTwoChar(name) {
      return name.substring(0, 2);
    }
  }
}
</script>

<style lang="scss" src="@/assets/scss/views/nav/team/unitTeam.scss" scoped></style>
