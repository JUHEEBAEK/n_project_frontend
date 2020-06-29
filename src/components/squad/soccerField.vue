<template>
  <div>
    <v-container class="pitch__container">
      <v-row justify="space-around">
        <v-col cols="4" class="position__area"></v-col>
        <v-col cols="4" class="position__area position__gk">
          <div class="position__container">
            <div class="position__label">GK</div>
            <div class="position__content">
              <v-btn fab depressed>{{ position.gk }}</v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="4" class="position__area"></v-col>
      </v-row>
      <v-row justify="space-around" class="position__defender">
        <v-col cols="4" class="position__area position__rb">
          <div class="position__container">
            <div class="position__label">RB</div>
            <div class="position__content">
              <v-btn v-if="position.rb" fab depressed>{{ position.rb }}</v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="4" class="position__area position__cb">
          <div class="position__container">
            <div class="position__label">CB</div>
            <div class="position__content">
              <v-btn v-if="position.cb" fab depressed>{{ position.cb }}</v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="4" class="position__area position__lb">
          <div class="position__container">
            <div class="position__label">LB</div>
            <div class="position__content">
              <v-btn v-if="position.lb" fab depressed>{{ position.lb }}</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="space-around" class="position__midfilder">
        <v-col cols="4" class="position__area position__rcm">
          <div class="position__container">
            <div class="position__label">RCM</div>
            <div class="position__content">
              <v-btn v-if="position.rcm" fab depressed>{{ position.rcm }}</v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="4" class="position__area position__cm">
          <div class="position__container">
            <div class="position__label">CM</div>
            <div class="position__content">
              <v-btn v-if="position.cm" fab depressed>{{ position.cm }}</v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="4" class="position__area position__lcm">
          <div class="position__container">
            <div class="position__label">LCM</div>
            <div class="position__content">
              <v-btn v-if="position.lcm" fab depressed>{{ position.lcm }}</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="space-around" class="position__forward">
        <v-col cols="4" class="position__area position__rw">
          <div class="position__container">
            <div class="position__label">RW</div>
            <div class="position__content">
              <v-btn v-if="position.rw" fab depressed>{{ position.rw }}</v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="4" class="position__area position__fw">
          <div class="position__container">
            <div class="position__label">FW</div>
            <div class="position__content">
              <v-btn v-if="position.fw" fab depressed>{{ position.fw }}</v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="4" class="position__area position__lw">
          <div class="position__container">
            <div class="position__label">LW</div>
            <div class="position__content">
              <v-btn v-if="position.lw" fab depressed>{{ position.lw }}</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    position: {
      gk: "",
      lb: "",
      cb: "",
      rb: "",
      lcm: "",
      cm: "",
      rcm: "",
      lw: "",
      fw: "",
      rw: ""
    }
  }),
  created() {
    this.setPositionMember();
  },
  methods: {
    setPositionMember: function() {
      this.position.gk = "이종은";
      this.position.cb = "이화인";
      this.position.lw = "박채민";
      this.position.rw = "이지윤";
      this.position.cm = "백주희";
    }
  }
};
</script>

<style lang="scss">
.pitch__container {
  width: 100%;
  background-color: #508c54;
  padding: 0;
  .position__midfilder {
    border-top: solid 1px white;
  }

  .position__area {
    padding: 5px 0;
    min-height: 120px;
    max-width: 120px;
    align-self: center;
    &.position__gk {
      border: solid 1px white;
      border-top: none;
    }
    .position__content {
      line-height: 80px;
    }
  }
}
</style>