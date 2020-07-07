import Vue from "vue";
import Router from "vue-router";

import Home from "../views/Home.vue";
import Attend from "../views/footer/Attend.vue";
import SquadView from "../views/footer/Squad.vue";
import GameReport from "../views/footer/GameReport.vue";
import Ranking from "../views/footer/Ranking.vue";

import Team from "../views/nav/TeamView.vue";
import Member from "../views/nav/member/Member.vue";
import Profile from "../views/nav/member/Profile.vue";
import MemberAdd from "../views/nav/member/MemberAdd.vue";
import Calendar from "../views/nav/Schedule.vue";

import Squad from "../views/nav/squad/Squad.vue";
import MatchPrepare from "../views/nav/squad/MatchPrepare.vue";

import MatchInput from "../views/nav/match/MatchInput.vue";
import NotFound from "../views/NotFound.vue";

import Stadium from "../views/nav/stadium/Stadium.vue"
import StadiumAdd from "../views/nav/stadium/StadiumAdd.vue"
import StadiumUpdate from "../views/nav/stadium/StadiumUpdate.vue"

Vue.use(Router);

const routes = [{
    path: "/",
    name: "home",
    component: Home
  },
  // footer view
  {
    path: "/attend",
    name: "attend",
    component: Attend
  },
  {
    path: "/gameReport",
    name: "gameReport",
    component: GameReport
  },
  // {
  //   path: "/squadView",
  //   name: "squad",
  //   component: SquadView
  // },
  {
    path: "/ranking",
    name: "ranking",
    component: Ranking
  },
  // navigation view
  {
    path: "/team",
    component: Team,
  },
  {
    path: "/member",
    component: Member,
  },
  {
    name: "memberUpdatePage",
    path: "/member/:memberId",
    component: Profile,
    props: true
  },
  {
    path: "/memberAdd",
    name: "memberAdd",
    component: MemberAdd
  },
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar
  },
  {
    path: "/squad",
    name: "squadInput",
    component: Squad
  },
  {
    path: "/matchPrepare/schedule/:schedule_id/quarter/:quarter",
    name: "matchPrepare",
    component: MatchPrepare,
    props: true
  },
  {
    path: "/matchPrepare",
    name: "matchPrepareBasic",
    component: MatchPrepare,
  },
  {
    path: "/matchInput/schedule/:schedule_id/quarter/:quarter",
    name: "matchInput",
    component: MatchInput,
    props: true
  },
  {
    path: "/stadium",
    name: "stadium",
    component: Stadium  
  },
  {
    path: "/StadiumAdd",
    name: "stadiumAdd",
    component: StadiumAdd 
  },
  {
    name: "stadiumUpdate",
    path: "/stadium/:stadiumId",
    component: StadiumUpdate,
    props: true
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  },
]

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;