<template>
  <v-row class="mx-2">
    <!-- 헤더영역 날짜와 쿼터 선택 -->
    <v-col cols="6" class="py-1">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Picker date"
            prepend-icon="fas fa-calendar-alt"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable @change="changeDate">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
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