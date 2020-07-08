<template>
  <div>
    <v-container class="pitch__container">
      <v-row
        justify="space-around"
        v-for="groupLine in positionLabel"
        :key="groupLine"
        :class="`group__${groupLine}`"
      >
        <v-col cols="4" class="position__area" v-for="item in groupLine" :key="item">
          <div class="position__container">
            <div class="position__label">{{ item }}</div>
            <div class="position__content">
              <v-btn
                class="position__name"
                small
                v-if="position[item]"
                fab
                depressed
              >{{ position[item] }}</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    positionLabel: {
      type: Object,
      default: {}
    }
  },
  data: () => ({
    position: {
      GK: "",
      LB: "",
      CB: "",
      RB: "",
      LCM: "",
      CM: "",
      RCM: "",
      LW: "",
      FW: "",
      RW: ""
    }
  }),
  created() {
    this.setPositionMember();
  },
  methods: {
    setPositionMember: function() {
      this.position.GK = "이종은";
      this.position.CB = "이화인";
      this.position.LW = "박채민";
      this.position.RW = "이지윤";
      this.position.CM = "백주희";
    }
  }
};
</script>

<style lang="scss" scoped src="../../styles/components/squad/soccerField.scss"></style>
