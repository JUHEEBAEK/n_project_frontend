<template>
  <div>
    <div class="main__title">
      <core-breadcrumbs :items="items" />
    </div>
    <div class="main__header">
      <v-avatar class="ma-2" color="teal" v-for="item in unitTeamPlayerList" :key="name">
        <span class="white--text headline">{{ showTwoChar(item.name) }}</span>
      </v-avatar>
      <v-btn icon snallclass="white--text" @click="addUnitPlayer">
        <v-icon class="fas fa-plus"></v-icon>
      </v-btn>
    </div>
    <div class="main__content">
      <div class="main__left"></div>
      <div class="main__right"></div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapActions } from "vuex";
const {
  mapState: unitMemberMapState,
  mapActions: unitMemberMapActions,
} = createNamespacedHelpers("unitMember");
export default {
  data: () => ({
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
    ]
  }),
  computed: {
    ...unitMemberMapState(["unitTeamPlayerList"])
  },
  created() {
    let unit_team_id = this.$route.params.teamId;
    this.select_unit_team_member(unit_team_id);
  },
  methods: {
    ...unitMemberMapActions(["select_unit_team_member"]),
    showTwoChar(name) {
      return name.substring(0, 2);
    },
    addUnitPlayer: function() {
      console.log("add");

    }
  }
}
</script>

<style lang="scss" src="@/assets/scss/views/nav/team/unitTeam.scss" scoped></style>
