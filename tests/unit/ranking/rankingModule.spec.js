import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import memberConfig from "@/store/modules/ranking.js";
import { cloneDeep } from "lodash";

test("state init", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(memberConfig));

  expect(store.state.rankingData).toBeDefined();
});
