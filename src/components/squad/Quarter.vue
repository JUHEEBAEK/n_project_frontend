<template>
  <v-container class="quarter__container">
    <v-row class="mx-2">
      <v-col cols="12" class="quarter__list">
        <v-slide-group v-model="slideIndex" show-arrows center-active>
          <v-slide-item
            v-for="item in quarterList"
            class="my-2"
            :key="item"
            v-slot:default="{ active, toggle }"
          >
            <v-card
              class="quarter__card"
              :class="{ active: active }"
              height="30"
              width="50"
              @click="toggle"
              @click.native="setQuaterInfo(item)"
            >
              <v-card
                class="date__card ma-2"
                :class="{ active: active }"
                height="70"
                width="50"
                @click="toggle"
                @click.native="setQuaterInfo(item)"
              >
                <v-row class="fill-height" align="center" justify="center">
                  <v-scale-transition>
                    <div>
                      <p class="date__Mon my-2"> Q{{item}}</p>
                    </div>
                  </v-scale-transition>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import regex from "../../mixin/regex.js";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("prepareMatch");

export default {
  mixins: [regex],
  data: () => ({
    menu: false,
  }),
  computed: {
    ...mapState(["quarterList", "quarterIndex"]),
    slideIndex: {
      get: function() {
        return this.quarterIndex;
      },
      set: function(new_value) {
        this.QAURTER_INDEX(new_value);
      },
    },
  },
  mounted() {
    // 가장 처음에 아무거나 하나 선택되어 있게 할 것
  },
  methods: {
    ...mapMutations(["SET_DATE", "QAURTER_INDEX"]),
    setQuaterInfo() {
      console.log("setQuarterInfo");
      //쿼터 정보를 불러온다
      let selectedQuarter = this.quarterList[this.quarterIndex]
      this.$emit("changeQarter", selectedQuarter);
    },
  },
};
</script>

<style lang="scss">
.quarter__container {
  padding: 0;
  .quarter__list {
    .quarter__card {
      margin: 0px 5px;
      padding: 5px 0;
      background-color: #fafafa;
      .quarter__text {
        font-size: 14px;
        color: #666;
        font-weight: 500;
        margin-bottom: 0;
      }
      &.active {
        background-color: #34558b;
        .quarter__text {
          color: #ddd;
        }
      }
    }
  }
}
</style>
