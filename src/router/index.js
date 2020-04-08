import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// router 설정
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue")
    },
    // footer view
    {
      path: "/attend",
      name: "attend",
      component: () => import("../views/footer/Attend.vue")
    },
    {
      path: "/squadView",
      name: "squad",
      component: () => import("../views/footer/Squad.vue")
    },
    {
      path: "/teamSetting",
      name: "teamSetting",
      component: () => import("../views/footer/TesmSetting.vue")
    },

    // navigation view
    {
      path: "/member",
      component: () => import("../views/nav/member/Member.vue"),
    },
    {
      name: "memberUpdatePage",
      path: "/member/:memberId",
      component: () => import("../views/nav/member/Profile.vue"),
      props: true
    },
    {
      path: "/memberAdd",
      name: "memberAdd",
      component: () => import("../views/nav/member/MemberAdd.vue")
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => import("../views/nav/Schedule.vue")
    },
    {
      path: "/squad",
      name: "squadInput",
      component: () => import("../views/nav/squad/Squad.vue")
    },
    {
      path: "/matchPrepare",
      name: "matchPrepare",
      component: () => import("../views/nav/squad/MatchPrepare.vue")
    },
    {
      path: "/testUi",
      component: () => import("../views/testui/testUi.vue")
    },
    {
      path: "*",
      name: "notFound",
      redirect: {
        name: "home"
      }
      // component: () => import("../views/NotFound.vue")
    }
  ]
});

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