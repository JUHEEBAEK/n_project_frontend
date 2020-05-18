import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [{
    path: "/",
    name: "home",
    // beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/Home.vue")
  },
  // footer view
  {
    path: "/attend",
    name: "attend",
    // beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/footer/Attend.vue")
  },
  {
    path: "/squadView",
    name: "squad",
    // beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/footer/Squad.vue")
  },

  // navigation view
  {
    path: "/member",
    // beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/member/Member.vue"),
  },
  {
    name: "memberUpdatePage",
    path: "/member/:memberId",
    // beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/member/Profile.vue"),
    props: true
  },
  {
    path: "/memberAdd",
    name: "memberAdd",
    // beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/member/MemberAdd.vue")
  },
  {
    path: "/calendar",
    name: "calendar",
    // beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/Schedule.vue")
  },
  {
    path: "/squad",
    name: "squadInput",
    // beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/squad/Squad.vue")
  },
  {
    path: "/matchPrepare",
    name: "matchPrepare",
    // beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/squad/MatchPrepare.vue")
  },
  {
    path: "/tactical",
    // beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/Tactical.vue")
  },
  {
    path: "/ranking",
    name: "ranking",
    // beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/footer/Ranking.vue")
  },
  {
    path: "/matchInput",
    name: "matchInput",
    // beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/match/MatchInput.vue")

  },
  {
    path: "/testUi",
    // beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/testui/testUi.vue")
  },
  {
    path: "*",
    name: "notFound",
    component: () => import("../views/Home.vue")
  }
]

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;


/*

< 추후 모듈화가 필요할 경우에 대비한 코드 >

const baseRoutes = [
  {
    path: "/",
    name: "home",
    component: Home
  }
];

const routes = baseRoutes.concat(test);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

*/