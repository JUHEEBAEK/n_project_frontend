<template>
  <div>
    <core-breadcrumbs :items="breadcrumb" />
    <div class="main__header">
      <div class="player__list">
        <div>
          총 <b>{{ unitMembersLength }}</b> 명
        </div>
        <div v-for="item in unitTeamMembers" :key="item" class="player__item">
          <div v-if="isActive" class="item__badge">
            <v-btn class="badge__button" fab color="error" x-small @click="deleteMember(item)">
              <v-icon x-small class="fas fa-times"></v-icon>
            </v-btn>
          </div>
          <v-avatar class="avactar__item" color="teal darken-3">
            <!-- TODO: 전체 이름 tooltip으로 보여주기 -->
            <span class="avactar__text">{{ showTwoChar(item.name) }}</span>
          </v-avatar>
        </div>

        <v-btn icon small class="grey--text" @click="toggleDialog(true)">
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

    <dialog-add-unit-member
      :dialog="dialog"
      :unitTeamId="unitTeamInfo.id_unit_team"
      @setLoading="setLoadingBar"
      @close="toggleDialog"
    />
    <req-loading :loading="loading" :size="100" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Breadcrumbs from "@/components/core/Breadcrumbs.vue";
import DialogAddUnitMemeber from "@/components/dialog/member/AddUnitMember.vue";
import Loading from "@/components/loading";

export default {
  components: {
    "core-breadcrumbs": Breadcrumbs,
    "dialog-add-unit-member": DialogAddUnitMemeber,
    "req-loading": Loading
  },
  data: () => ({
    isActive: false,
    dialog: false,
    loading: false
  }),
  computed: {
    ...mapGetters("unitTeam", ["unitTeamInfo"]),
    ...mapGetters("unitMember", ["unitTeamMembers"]),
    unitMembersLength() {
      return this.unitTeamMembers.length;
    },
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
    ...mapActions("unitMember", ["getUnitTeamMember", "deleteUnitMember"]),
    async loadUnitTeam(teamId) {
      await this.getUnitTeamInfo(teamId);
    },
    async loadUnitTeamMember(teamId) {
      await this.getUnitTeamMember(teamId);
    },
    async deleteMember(member) {
      await this.deleteUnitMember(member);
    },
    toggleDialog(value) {
      this.dialog = value;
    },
    setLoadingBar(value) {
      this.loading = value;
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
