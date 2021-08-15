<template>
  <div>
    <div class="container">
      <v-row class="row__header" justify="center">
        <v-col cols="12" sm="4" md="4" lg="3" class="col__first">
          <!-- <v-btn icon small @click="prevYear">
            <v-icon class="fas fa-angle-left"></v-icon>
          </v-btn>
          <span> {{ year }} </span>
          <v-btn icon small @click="nextYear">
            <v-icon class="fas fa-angle-right"></v-icon>
          </v-btn> -->
          <v-select
            v-model="year"
            :items="years"
            label="season"
            solo
            item-text="label"
            item-value="value"
            rounded
            @change="selectedYear"
          />
        </v-col>
      </v-row>
      <v-row class="row__first">
        <v-col cols="12" class="col__second">
          <v-card class="card__container">
            <div class="first__box">
              <div class="box__team">
                <v-avatar tile class="avatar__container">
                  <v-img
                    v-if="teamInfo.emblem"
                    :src="$imgBaseUrl + teamInfo.emblem"
                    class="footer__img"
                    contain
                  />
                  <v-img
                    v-else
                    src="@/assets/images/emb-default.png"
                    class="footer__img"
                    contain
                  />
                </v-avatar>
                <!-- <span class="text__name">{{ teamName }}</span> -->
              </div>
              <div class="box__uniformNumber">
                <v-avatar tile class="avatar__container">
                  <v-img
                    :src="$imgBaseUrl + imgUrl"
                    class="footer__img"
                    contain
                  />
                </v-avatar>
                <span class="text__uniformNumber">{{
                  profile.uniform_number
                }}</span>
              </div>
            </div>
            <div class="second__box">
              <div class="text__name">
                {{ profile.name }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="row__second">
        <v-col col="3" sm="6" md="3" lg="3" class="col__box">
          <div class="card__container">
            <div class="card__title">Attends</div>
            <div class="card__content">
              <v-img
                src="@/assets/images/barrier.png"
                class="card__img"
                contain
              />
              <span>{{ count.attend }}</span>
            </div>
          </div>
        </v-col>
        <v-col col="3" sm="6" md="3" lg="3" class="col__box">
          <div class="card__container">
            <div class="card__title">Games</div>
            <div class="card__content">
              <v-img
                src="@/assets/images/kick-off.png"
                class="card__img"
                contain
              />
              <span>{{ count.game }}</span>
            </div>
          </div>
        </v-col>
        <v-col col="3" sm="6" md="3" lg="3" class="col__box">
          <div class="card__container">
            <div class="card__title">Goal</div>
            <div class="card__content">
              <v-img src="@/assets/images/goal.png" class="card__img" contain />
              <span>{{ count.goal }}</span>
            </div>
          </div>
        </v-col>
        <v-col col="3" sm="6" md="3" lg="3" class="col__box">
          <div class="card__container">
            <div class="card__title">Assist</div>
            <div class="card__content">
              <v-img
                src="@/assets/images/shoes.png"
                class="card__img"
                contain
              />
              <span>{{ count.assist }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="row__third">
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <div class="card__container">
            <div class="card__title">내 골 넣을 때 도움 준 사람들</div>
            <div class="card__content">
              <div
                v-for="(assister, index) in whoMyAssistList"
                :key="`assist_${index}`"
                class="rank__item"
              >
                <b class="text__rank">{{ index + 1 }}</b>
                <span class="text__name">{{ assister.name }}</span>
                <span class="text__count">{{ assister.score }} assist</span>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <div class="card__container">
            <div class="card__title">내 도움으로 골 넣은 사람들</div>
            <div class="card__content">
              <div
                v-for="(goaler, index) in whoMyGoalList"
                :key="`goal_${index}`"
                class="rank__item"
              >
                <b class="text__rank">{{ index + 1 }}</b>
                <span class="text__name">{{ goaler.name }}</span>
                <span class="text__count">{{ goaler.score }} goal</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <util-loading v-if="loading" :size="100" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { mapGetters } from "vuex";

import util from "../../mixins/util.js";
import memberConst from "../../assets/value/member.json";

const {
  mapState: accountMapState,
  mapGetters: accountMapGetters
} = createNamespacedHelpers("account");

const {
  mapState: memberMapState,
  mapActions: memberMapActions
} = createNamespacedHelpers("member");

const {
  mapState: teamMapState,
  mapActions: teamMapActions
} = createNamespacedHelpers("team");

const {
  mapState: personalMapState,
  mapActions: personalMapActions
} = createNamespacedHelpers("personal");

export default {
  mixins: [util],
  props: {
    memberId: {
      type: [String, Number]
    }
  },
  data: () => ({
    imgUrl: "003-tshirt.png",
    count: {
      attend: 0,
      game: 0,
      goal: 0,
      assist: 0
    },

    year: 0
  }),
  computed: {
    ...accountMapGetters(["userInfo"]),
    ...memberMapState(["profile"]),
    ...personalMapState(["whoMyAssistList", "whoMyGoalList"]),
    ...teamMapState(["teamInfo"]),
    years() {
      let years = [{ label: "전체", value: 0 }];
      let startYear = 2018;
      while (startYear <= new Date().getFullYear()) {
        years.push({ label: startYear, value: startYear });
        startYear++;
      }
      return years;
    }
  },
  async created() {
    this.setLoadingBar(true);
    console.log(this.memberId);
    await this.getMemberInfo(this.memberId);
    await this.getCount(this.memberId);
    this.setLoadingBar(false);
  },
  methods: {
    ...memberMapActions(["details_member"]),
    ...teamMapActions(["details_team"]),
    ...personalMapActions([
      "get_number_of_goal",
      "get_number_of_assist",
      "get_my_assister_list",
      "get_my_goaler_list",
      "get_number_of_attended",
      "get_number_of_played_match"
    ]),
    getCount: function(member_id, year) {
      const teamId = this.userInfo.team_id;
      this.getTeamInfo(teamId);
      this.getNumberOfGoal(member_id, year);
      this.getNumberOfAssist(member_id, year);
      this.getNumberOfDaysAttended(member_id, year);
      this.getNumberOfMatchPlayed(member_id, year);
      this.getMyAssisterList(member_id, year);
      this.getMyGoalerList(member_id, year);
    },
    selectedYear(val) {
      this.getCount(this.member_id, val);
    },
    getTeamInfo: async function(teamId) {
      const result = await this.details_team(teamId);
    },
    getMemberInfo: async function(memberId) {
      const result = await this.details_member(memberId);
    },
    getNumberOfGoal: async function(memberId, year) {
      let payload = { id: memberId, year: year };
      const result = await this.get_number_of_goal(payload);
      if (result.score) {
        this.count.goal = result.score;
      }
    },
    getNumberOfAssist: async function(memberId, year) {
      let payload = { id: memberId, year: year };
      const result = await this.get_number_of_assist(payload);
      if (result.score) {
        this.count.assist = result.score;
      }
    },
    getNumberOfDaysAttended: async function(memberId, year) {
      let payload = { id: memberId, year: year };
      const result = await this.get_number_of_attended(payload);
      if (result.score) {
        this.count.attend = result.score;
      }
    },
    getNumberOfMatchPlayed: async function(memberId, year) {
      let payload = { id: memberId, year: year };
      const result = await this.get_number_of_played_match(payload);
      if (result.score) {
        this.count.game = result.score;
      }
    },
    getMyAssisterList: async function(memberId, year) {
      let payload = { id: memberId, year: year };
      const result = await this.get_my_assister_list(payload);
    },
    getMyGoalerList: async function(memberId, year) {
      let payload = { id: memberId, year: year };
      const result = await this.get_my_goaler_list(payload);
    }
  }
};
</script>

<style
  scoped
  lang="scss"
  src="@/assets/scss/views/footer/memberDetails.scss"
></style>
