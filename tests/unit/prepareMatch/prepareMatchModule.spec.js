import {
    createLocalVue
  } from "@vue/test-utils";
  import Vuex from "vuex";
  import storeConfig from "@/store/modules/squad.js";
  import {
    cloneDeep
  } from "lodash";

test("Parse state.teamSplit", async()=>{
    // 환경세팅
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store(cloneDeep(storeConfig));

    
    expect(store.state.summarySplitTeamList)
    expect(store.state.selectedSplitedTeam)
  
  })
  