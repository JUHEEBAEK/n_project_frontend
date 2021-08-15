import Vue from "vue";
import VueRouter from "vue-router";

const publicRoutes = [
  // token 검증없이 접근 가능한 라우터
  {
    path: "/",
    name: "login",
    component: () => import(/* webpackMode: "lazy" */ "@/views/login/Login")
  },
  {
    path: "/join",
    name: "join",
    component: () => import(/* webpackMode: "lazy" */ "@/views/join/Join.vue")
  }
];

/*
[동일 라우터 요청시 vue-router rejection 처리]
- FIXME https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
- 예) setting 메뉴 같이 부모 라우터가 형식상으로 존재하는 경우(setting이 없고 사실상 바로 setting/team-profile로 접근)
  - setting 라우터 접근시 setting/team-profile로 redirect 처리하도록 해둠
  - vuex에서 updateMenu가 payload로 받는 값이 setting인경우 현재 라우터가 setting/temp-profile이면 다른 라우터로 요청한다고 판다
  - vue-router는 setting을 redirect하므로 동일 라우터라고 판단해서 rejection 반환
  - 일단 TheLeftNav에서 redirect 값이 있는 경우 그 값으로 전달하로도록 처리해둠, 추후 이런 케이스가 다양해지면 추가 작업 필요
*/

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
//   return originalPush.call(this, location).catch(err => err);
// };

Vue.use(VueRouter);

const createRouter = () =>
  new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: publicRoutes
  });

const router = createRouter();

export function resetRoutes() {
  // https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
