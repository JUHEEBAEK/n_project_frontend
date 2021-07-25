import Login from "@/views/login/Login.vue";

import Join from "@/views/Join.vue";
const Home = () => import("@/views/Home.vue");
const Member = () => import("@/views/footer/Member.vue");

export const routesName = {
  login: "login",
  home: "home",
  join: "join",
  member: "member"
};

const routes = [
  {
    path: "/",
    name: routesName.login,
    component: Login
  },
  {
    path: "/home",
    name: routesName.home,
    component: Home
  },
  // {
  //   path: "/login",
  //   name: routesName.login,
  //   component: Login
  // },
  {
    path: "/join",
    name: routesName.join,
    component: Join
  },

  // footer view
  {
    path: "/member",
    name: routesName.member,
    component: Member
    // beforeEnter: requireAuth()
  },
  {
    path: "*",
    name: "notFound",
    redirect: { name: "home" }
  }
];

export default routes;
