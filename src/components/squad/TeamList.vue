<template>
  <div>
    <squad-team-list-selector />
    <v-row row wrap justify="center" class="py-2">
      <v-col cols="12">
        <div class="selectTeam__box">
          <div class="team__home">
            <squad-team-list-member-card
              :title="'Home ' + (homeTeam.teamNumber || '')"
              :members="homeTeam.members"
              deletable
              @delete="unselectTeam('home')"
            />
          </div>
          <div class="align-self-center">
            <h2 class="mx-3">VS</h2>
          </div>
          <div class="team__away">
            <squad-team-list-member-card
              :title="'Away ' + (awayTeam.teamNumber || '')"
              :members="awayTeam.members"
              deletable
              @delete="unselectTeam('away')"
            />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row cols="12" class="mb-5" justify="center">
      <div class="team__jocker">
        <squad-team-list-member-card title="Jocker" :members="jocker.members" />
      </div>
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
