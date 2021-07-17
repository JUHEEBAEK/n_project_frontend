// Libraries
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

import DateAndQuarter from "@/components/squad/DateAndQuarter.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { cloneDeep } from "lodash";
import prepareConfig from "@/store/modules/prepareMatch.js";

const localVue = createLocalVue();

Vue.use(Vuetify);
localVue.use(Vuex);
const store = new Vuex.Store(cloneDeep(prepareConfig));

describe("DateAndQuarter", () => {
  let vuetify;

  const store = new Vuex.Store({
    state: {},
    modules: {
      prepareMatch: {
        namespaced: true
      }
    }
  });

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  test("DateAndQuarter components test init", () => {
    const wrapper = shallowMount(DateAndQuarter, {
      localVue,
      store,
      vuetify
    });

    expect(wrapper.contains(".firstBox__container")).toBe(true);
    expect(wrapper.contains(".firstBox__picker--date")).toBe(true);
    expect(wrapper.contains(".firstBox__select--quarter")).toBe(true);
  });

  test("Date is today?", () => {
    const wrapper = shallowMount(DateAndQuarter, {
      localVue,
      store,
      vuetify
    });
    expect(wrapper.name()).toBe("dateAndQuarter");
    // expect(wrapper.find('firstBox__input')).toBe("2020-04-12");
  });
});
