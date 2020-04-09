<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" lg="10" class="py-0" align-self="center">
        <v-divider />
        <v-sheet v-if="divideTeam !== null">
          <v-slide-group show-arrows>
            <v-slide-item v-for="item in divideTeam" :key="item.team" v-slot:default="{ toggle }">
              <v-card class="team__box" @click.native="clickTeam(item.team)" @click="toggle">
                <v-card-title>{{item.team}}</v-card-title>
                <v-card-text class="member__box">
                  <span
                    v-for="data in item.items"
                    :key="data.id"
                    class="team__member"
                  >{{ data.name }}</span>
                </v-card-text>
              </v-card>
            </v-slide-item>
            <v-slide-item class="align-self-center">
              <v-btn color="primary" small icon @click="removeTeam">
                <v-icon size="24" v-text="'fas fa-minus-circle'"></v-icon>
              </v-btn>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
        <v-sheet v-else color="grey lighten-4" class="vertical-middle py-10">
          <v-btn large @click="openTeamList">Team 불러오기</v-btn>
        </v-sheet>
        <v-divider />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mx-2 py-1">
        <v-switch class="mt-0" v-model="isHome" hide-details :label="`Status: ${setStatus}`"></v-switch>
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
            <v-card color="grey lighten-2" width="150" height="150">
              <v-card-title class="justify-center">{{homeTeam.team}}</v-card-title>
              <v-card-text class="member__box justify-center">
                <span
                  v-for="member in homeTeam.items"
                  :key="member.id"
                  class="team__member"
                >{{ member.name }}</span>
              </v-card-text>
            </v-card>
          </div>
          <div class="align-self-center">
            <h2 class="mx-3">VS</h2>
          </div>
          <div class="team__away">
            <v-card color="grey lighten-2" width="150" height="150">
              <v-card-title class="justify-center">{{awayTeam.team}}</v-card-title>
              <v-card-text class="member__box justify-center">
                <span
                  v-for="member in awayTeam.items"
                  :key="member.id"
                  class="team__member"
                >{{ member.name }}</span>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>
    <dialog-squad-team-list v-if="dialog===true && type==='teamList'" @saveTeam="saveTeam"></dialog-squad-team-list>
  </div>
</template>

<script>
import dialog from "../../mixin/dialog.js";
import dummy from "../../assets/value/dummy.json";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("prepareMatch");

export default {
  mixins: [dialog],
  created() {},
  data: () => ({
    divideTeam: null
  }),
  computed: {
    ...mapState(["isHome", "teamList", "homeTeam", "awayTeam"]),
    setStatus() {
      if (this.isHome) {
        this.SET_TYPE("Home");
        return "Home";
      } else {
        this.SET_TYPE("Away");
        return "Away";
      }
    },
    isHome: {
      get() {
        return this.$store.state.prepareMatch.isHome;
      },
      set(val) {
        this.SET_IS_HOME(val);
      }
    }
  },
  methods: {
    ...mapMutations([
      "SET_HOME_TEAM",
      "SET_AWAY_TEAM",
      "SET_IS_HOME",
      "SET_TYPE"
    ]),
    clickTeam(value) {
      let selectedTeam = this.divideTeam[value];
      let targetTeam = null;
      let oppositeTeam = null;

      if (this.isHome) {
        targetTeam = this.homeTeam;
        oppositeTeam = this.awayTeam;
      } else {
        targetTeam = this.awayTeam;
        oppositeTeam = this.homeTeam;
      }

      let checkOppositeTeamIsSame = selectedTeam === oppositeTeam;
      if (checkOppositeTeamIsSame) {
        // swap home and away
        let tmp = {};
        tmp = targetTeam;
        targetTeam = oppositeTeam;
        oppositeTeam = tmp;
      } else {
        targetTeam = this.divideTeam[value];
      }

      if (this.isHome) {
        this.SET_HOME_TEAM(targetTeam);
        this.SET_AWAY_TEAM(oppositeTeam);
      } else {
        this.SET_HOME_TEAM(oppositeTeam);
        this.SET_AWAY_TEAM(targetTeam);
      }
    },
    openTeamList: function() {
      this.setDialogAndType({ dialog: true, type: "teamList" });
    },
    removeTeam() {
      this.divideTeam = null;
      this.SET_HOME_TEAM("");
      this.SET_AWAY_TEAM("");
    },
    saveTeam(item) {
      this.divideTeam = dummy.firstDivideTeam;
      this.setDialogAndType({ dialog: false, type: null });
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