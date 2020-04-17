<template>
  <v-container class="schedule__container">
    <v-row class="mx-2">
      <v-col cols="12" class="schedule__list">
          <v-slide-group v-model="slideIndex" show-arrows center-active>
            <v-slide-item
              v-for="item in quarterList"
              :key="item"
              v-slot:default="{ active, toggle }"
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
      get: function(){
        return this.quarterIndex
      },
      set: function(new_value){
        this.QAURTER_INDEX(new_value)
      },
    }
  },
  methods: {
    ...mapMutations(["SET_DATE", "QAURTER_INDEX"]),
    setQuaterInfo(){
      console.log('setQuarterInfo')
      //쿼터 정보를 불러온다
      let selectedQuarter = this.quarterList[this.quarterIndex]
      this.$emit("changeQarter", selectedQuarter);
    },
  }
};
</script>


<style lang="scss">
.schedule__container {
  padding: 0;
  .date__content {
    font-size: 20px;
    font-weight: 200;

    .date__year {
      font-size: 20px;
      font-weight: 400;
    }
    .date__month {
      font-size: 24px;
      font-weight: 500;
    }
  }
  .schedule__list {
    .date__card {
      background-color: #fafafa;
      .date__Mon {
        color: #666;
        font-weight: 500;
      }
      .date__day {
        font-size: 20px;
        font-weight: 600;
        color: #34558b;
      }
      &.active {
        background-color: #34558b;
        .date__Mon {
          color: #ddd;
        }
        .date__day {
          font-size: 20px;
          font-weight: 600;
          color: white;
        }
      }
    }
  }
}
</style>
