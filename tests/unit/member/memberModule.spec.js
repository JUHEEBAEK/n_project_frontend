import { createLocalVue } from "@vue/test-utils"
import Vuex from "vuex"
import memberConfig from "@/store/modules/member.js";
import { cloneDeep } from "lodash";

const renderer = require('vue-server-renderer').createRenderer();

test("state init", () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(memberConfig))

  expect(store.state.memberId).toBe("")
  expect(store.state.res).toBe("")
  expect(store.state.memberList).toStrictEqual([])
  expect(store.state.searchResult).toStrictEqual([])
  expect(store.state.profile).toStrictEqual({})
})

test("actions select_member test", async () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(memberConfig))

  await store.dispatch("select_member")
  expect(store.state.memberList[0].name).toBe("백주희")
})

test("actions get details_member", async () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(memberConfig))
  
  let details = [{ 
    bg_image: "ledGame.jpg",
    id: 2,
    inflow_route: "I",
    join_date: "2018-07-19T15:00:00.000Z",
    name: "백주희",
    nick_name: "BAEK",
    position: null,
    uniform_number: "20"
  }];
  let profile = await store.dispatch("details_member", 2)
  await store.commit("DETAILS_MEMBER", profile)
  
  expect(profile).toStrictEqual(details)
  expect(store.state.profile).toStrictEqual(details)

  renderer.renderToString(localVue.vm, (err, str) => {
    expect(str).toMatchSnapshot()
  })
})

test("actions add member", async () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(memberConfig))
  

})


