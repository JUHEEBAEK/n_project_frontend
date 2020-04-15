<template>
  <v-row class="mx-2">
    <!-- 헤더영역 쿼터 선택 -->
    <v-col cols="6" class="py-0">
      <v-select :items="quarterList" label="quarter" :rules="emptyCheckRules"></v-select>
    </v-col>
  </v-row>
</template>

<script>
import regex from "../../mixin/regex.js";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("prepareMatch");

export default {
  created() {},
  mixins: [regex],
  computed: {
    ...mapState(["quarterList", "date", "menu_date"])
  },
  data: () => ({
    menu: false
  }),
  methods: {
    ...mapMutations(["SET_DATE"]),
    changeDate(date) {
      this.SET_DATE(date);
    }
  }
};
</script>

<style>
</style>