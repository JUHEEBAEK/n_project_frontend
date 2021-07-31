<template>
  <v-row justify="center">
    <v-col cols="12" justify-content="center">
      <v-sheet color="grey lighten-4" class="vertical-middle py-3">
        <v-btn large color="primary" @click="openTeamList">Team 불러오기</v-btn>
      </v-sheet>
    </v-col>
    <v-col cols="12" lg="10" class="py-0" align-self="center">
      <v-divider />
      <v-sheet v-if="selectedSplitedTeam !== null">
        <v-slide-group show-arrows>
          <v-slide-item
            v-for="(teamDict, index) in selectedSplitedTeam"
            :key="index"
            v-slot:default="{ toggle }"
          >
            <template v-if="teamDict.teamNumber != -1">
              <v-card
                class="team__box"
                @click.native="set_home_away_team(teamDict)"
                @click="toggle"
              >
                <v-card-title>{{ teamDict.teamNumber }}</v-card-title>
                <v-card-text class="member__box">
                  <span
                    v-for="member in teamDict.members"
                    :key="member.id"
                    class="team__member"
                    >{{ member.name }}</span
                  >
                </v-card-text>
              </v-card>
            </template>
            <template v-else>
              <v-card class="team__box">
                <v-card-title>조커</v-card-title>
                <v-card-text class="member__box">
                  <span
                    v-for="member in teamDict.members"
                    :key="member.id"
                    class="team__member"
                    >{{ member.name }}</span
                  >
                </v-card-text>
              </v-card>
            </template>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <dialog-squad-team-list
        v-if="dialog === true && type === 'teamList'"
        @saveTeam="saveTeam"
      ></dialog-squad-team-list>
      <v-divider />
    </v-col>
  </v-row>
</template>

<script>
import dialog from "../../mixins/dialog.js";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "prepareMatch"
);

export default {
  mixins: [dialog],
  data: () => ({}),
  computed: {
    ...mapState(["homeTeam", "awayTeam", "jocker", "selectedSplitedTeam"])
  },
  methods: {
    ...mapMutations([
      "SET_HOME_TEAM",
      "SET_AWAY_TEAM",
      "SET_JOCKER",
      "SET_IS_HOME",
      "SET_TYPE",
      "SET_SELECTED_SPLIT_TEAM"
    ]),
    ...mapActions(["setSelectedSplitedTeam"]),
    set_home_away_team(selectedTeam) {
      const selectedNameList = selectedTeam.members.map(member => member.name);
      const homeNameList = this.homeTeam.members.map(member => member.name);
      const awayNameList = this.awayTeam.members.map(member => member.name);

      if (
        this.$_.isEqual(selectedNameList, homeNameList) ||
        this.$_.isEqual(selectedNameList, awayNameList)
      ) {
        return;
      }
      if (!this.homeTeam.members || this.homeTeam.members.length == 0) {
        this.SET_HOME_TEAM(selectedTeam);
      } else if (!this.awayTeam.members || this.awayTeam.members.length == 0) {
        this.SET_AWAY_TEAM(selectedTeam);
      }
    },
    openTeamList: function() {
      this.setDialogAndType({ dialog: true, type: "teamList" });
    },
    saveTeam(team) {
      this.removeTeam();
      this.setSelectedSplitedTeam(team.splitTeamIndex);

      Object.keys(this.selectedSplitedTeam).forEach(key => {
        const teamDict = this.selectedSplitedTeam[key];
        if (teamDict.teamNumber == -1) {
          this.SET_JOCKER(teamDict);
        }
      });

      // if (isJockerExist) {
      //   let jockerMember = this.selectedSplitedTeam[0].members[0];
      //   this.SET_JOCKER(jockerMember);
      // }
      this.setDialogAndType({ dialog: false, type: null });
    },
    removeTeam() {
      this.SET_HOME_TEAM({ members: [] });
      this.SET_AWAY_TEAM({ members: [] });
      this.SET_JOCKER({ members: [] });
      this.SET_SELECTED_SPLIT_TEAM(null);
    }
  }
};
</script>

<style scoped>
.team__box {
  margin: 5px;
  overflow-y: scroll;
  max-width: 250px;
  max-height: 250px;
}
.team__select {
  align-self: center;
  padding: 0 10px;
  max-width: 150px !important;
}
.member__box {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
}
.team__member {
  margin: 3px;
}
</style>
