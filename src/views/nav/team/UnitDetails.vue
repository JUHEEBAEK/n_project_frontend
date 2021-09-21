<template>
  <div>
    <core-breadcrumbs :items="breadcrumb" />
    <div class="main__header">
      <div class="player__list">
        <div>
          총 <b>{{ unitTeamMembers.length }}</b> 명
        </div>
        <div v-for="item in unitTeamMembers" :key="item" class="player__item">
          <div v-if="isActive" class="item__badge">
            <v-btn class="badge__button" fab color="error" x-small @click="deleteMember(item)">
              <v-icon x-small class="fas fa-times"></v-icon>
            </v-btn>
          </div>
          <v-avatar class="avactar__item" color="teal darken-3">
            <span class="avactar__text">{{ showTwoChar(item.name) }}</span>
          </v-avatar>
        </div>

        <v-btn icon small class="grey--text" @click="addUnitPlayer">
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
    <!-- util -->
    <util-snack-bar v-if="snackBar" :purpose="snackBarPurpose" :message="snackBarMessage" />
    <util-loading v-if="loading" :size="100" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Breadcrumbs from "@/components/core/Breadcrumbs.vue";

export default {
  components: {
    "core-breadcrumbs": Breadcrumbs
  },
  data: () => ({
    isActive: false,
    unit_team_id: ""
  }),
  computed: {
    ...mapGetters("unitTeam", ["unitTeamInfo"]),
    ...mapGetters("unitMember", ["unitTeamMembers"]),
    breadcrumb() {
      return [
        {
          text: "팀 관리",
          disabled: false,
          href: "/team"
        },
        {
          text: this.unitTeamInfo.name,
          disabled: true
        }
      ];
    }
  },
  created() {
    const { teamId } = this.$route.params;
    this.loadUnitTeam(teamId);
    this.loadUnitTeamMember(teamId);
  },
  methods: {
    ...mapActions("unitTeam", ["getUnitTeamInfo"]),
    ...mapActions("unitMember", ["getUnitTeamMember"]),
    async loadUnitTeam(teamId) {
      await this.getUnitTeamInfo(teamId);
    },
    async loadUnitTeamMember(teamId) {
      await this.getUnitTeamMember(teamId);
    },
    addUnitPlayer: function() {
      this.setDialogAndType({ dialog: true, type: "addUnitMember" });
    },
    deleteMember: async function(member) {
      const result = await this.delete_unit_member(member.id_unit_member);
      if (result.status === 200) {
        this.setSnackBar(this.snackBarSuccess, "정상적으로 삭제 되었습니다.");
        this.loadUnitTeamMember();
      } else {
        this.setSnackBar(this.snackBarFail, "에러 실패!!");
      }
    },
    activeLock() {
      this.isActive = !this.isActive;
    },
    showTwoChar(name) {
      return name.substring(0, 2);
    }
  }
};
</script>

<style lang="scss" src="@/assets/scss/views/nav/team/unitTeam.scss" scoped></style>
