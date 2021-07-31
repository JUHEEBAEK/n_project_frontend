<template>
  <div>
    <squad-team-list-selector />
    <v-row>
      <v-col cols="12" class="mx-2 py-1">
        팀을 선택해주세요
      </v-col>
    </v-row>
    <v-row row wrap justify="center" class="py-2">
      <v-col cols="3"></v-col>
      <v-col cols="3" class="py-1">
        <div class="team__home">HOME</div>
      </v-col>
      <v-col cols="3" class="py-1">
        <div class="team__away">AWAY</div>
      </v-col>
      <v-col cols="3"></v-col>
      <v-col cols="12">
        <div class="selectTeam__box">
          <div class="team__home">
            <v-card color="grey lighten-2" width="350" min-height="150">
              <v-system-bar
                v-if="homeTeam.members"
                color="indigo darken-2"
                dark
              >
                <v-spacer></v-spacer>
                <v-icon @click="unselectTeam('home')">fas fa-times</v-icon>
              </v-system-bar>
              <v-card-title class="justify-center"
                >home {{ homeTeam.teamNumber }}</v-card-title
              >
              <v-card-text class="member__box justify-center">
                <span
                  v-for="(member, index) in homeTeam.members"
                  :key="index"
                  class="team__member"
                  >{{ member.name }}</span
                >
              </v-card-text>
            </v-card>
          </div>
          <div class="align-self-center">
            <h2 class="mx-3">VS</h2>
          </div>
          <div class="team__away">
            <v-card color="grey lighten-2" width="350" min-height="150">
              <v-system-bar
                v-if="awayTeam.members"
                color="indigo darken-2"
                dark
              >
                <v-spacer></v-spacer>
                <v-icon @click="unselectTeam('away')">fas fa-times</v-icon>
              </v-system-bar>
              <v-card-title class="justify-center"
                >away {{ awayTeam.teamNumber }}</v-card-title
              >
              <v-card-text class="member__box justify-center">
                <span
                  v-for="(member, index) in awayTeam.members"
                  :key="index"
                  class="team__member"
                  >{{ member.name }}</span
                >
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-col>
      <v-col v-if="jocker.name !== null" cols="12">
        <div class="team__jocker">
          <v-card
            class="mx-auto"
            color="grey lighten-2"
            width="200"
            height="100"
          >
            <v-card-text>JOCKER</v-card-text>
            <v-card-text class="member__box justify-center">
              <span class="team__member">{{ jocker.name }}</span>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("prepareMatch");

export default {
  data: () => ({}),
  computed: {
    ...mapState(["homeTeam", "awayTeam", "jocker"])
  },
  methods: {
    ...mapMutations(["SET_HOME_TEAM", "SET_AWAY_TEAM"]),

    unselectTeam(homeAway) {
      if (homeAway == "home") {
        this.SET_HOME_TEAM({ members: [] });
      } else if (homeAway == "away") {
        this.SET_AWAY_TEAM({ members: [] });
      }
    }
  }
};
</script>

<style scoped>
.member__box {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
}
.team__member {
  margin: 3px;
}
.selectTeam__box {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
