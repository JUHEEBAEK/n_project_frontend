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
    {
      path: "/attendance",
      name: "attendance",
      component: () => import("../views/footer/Attendance.vue")
    },
    {
      path: "/squad",
      name: "squad",
      component: () => import("../views/footer/Squad.vue")
    },
    {
      path: "/teamSetting",
      name: "teamSetting",
      component: () => import("../views/footer/TesmSetting.vue")
    },
    {
      path: "/member",
      component: () => import("../views/nav/Member.vue"),
      children: [{
          path: "",
          name: "memberList"
          // component: () => import("../views/nav/Member.vue")
        },
        {
          path: ":id/profile",
          component: () => import("../views/nav/Profile.vue")
        }
      ]
    },
    {
      path: "/memberAdd",
      name: "memberAdd",
      component: () => import("../views/nav/MemberAdd.vue")
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => import("../views/nav/Schedule.vue")
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