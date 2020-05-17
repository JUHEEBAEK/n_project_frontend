import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);


/* 로그인을 해야만 볼 수 있는 페이지들에 대해 각 페이지를 들어가기 전, 토큰 & LocalStorage 의 유무를 판단
   
  main.js 와 다른점은 main.js 는 객체가 새로 생성될 때 
  즉, 사용자가 새로고침을 할때만 호출 되는 반면 beforeEnter 는 새로고침 & vue 내부에서의 routing 시 모두 호출된다.
  
  참고로, Vuex 정보가 모두 날라가는 시점은 사용자가 임의로 URL 을 치고 들어왔을 때 ( 예컨대 새로고침 ) 같은 경우 뿐이다. */
const authCheck = async (to, from, next) => {
  if (getToken()) {
    let payload = getTokenPayload(getToken());
    if (
      payload.idfAdmin &&
      payload.email &&
      payload.name &&
      payload.authority &&
      payload.exp 
    ) {
      next();
    } else {
      console.error(LOG, "payload || LocalStorage changed error");
      await store.dispatch("account/logout");
    }
  } else {
    console.error(LOG, "token || LocalStorage not exist error");
    await store.dispatch("account/logout");
  }
};

const routes = [{
    path: "/",
    name: "home",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/Home.vue")
  },
  // footer view
  {
    path: "/attend",
    name: "attend",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/footer/Attend.vue")
  },
  {
    path: "/squadView",
    name: "squad",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/footer/Squad.vue")
  },

  // navigation view
  {
    path: "/member",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/member/Member.vue"),
  },
  {
    name: "memberUpdatePage",
    path: "/member/:memberId",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/member/Profile.vue"),
    props: true
  },
  {
    path: "/memberAdd",
    name: "memberAdd",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/member/MemberAdd.vue")
  },
  {
    path: "/calendar",
    name: "calendar",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/Schedule.vue")
  },
  {
    path: "/squad",
    name: "squadInput",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/squad/Squad.vue")
  },
  {
    path: "/matchPrepare",
    name: "matchPrepare",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/squad/MatchPrepare.vue")
  },
  {
    path: "/tactical",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/Tactical.vue")
  },
  {
    path: "/ranking",
    name: "ranking",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/footer/Ranking.vue")
  },
  {
    path: "/matchInput",
    name: "matchInput",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/nav/match/MatchInput.vue")

  },
  {
    path: "/testUi",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: () => import("../views/testui/testUi.vue")
  },
  {
    path: "*",
    name: "notFound",
    
    redirect: {
      name: "home"
    },
    component: () => import("../views/Home.vue")
  }
]

const router = new VueRouter({
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