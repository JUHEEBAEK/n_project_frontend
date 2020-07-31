<template>
  <div class="text-center ma-2" v-show="isLoading">
    <div class="spinnerCard">
      <div id="liftingSpinner">
        <v-img id="liftingPlayer1" src="../../assets/player2.png" aspect-ratio="1" width="60"></v-img>
        <v-img id="liftingPlayer2" src="../../assets/player1.png" width="60"></v-img>
        <v-img id="liftingBall" src="../../assets/football.png" width="30" aspect-ratio="1"></v-img>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: Boolean
  },
  data: () => ({}),
  computed: {
    snackBar: {
      get() {
        return this.$store.state["common"].snackBar;
      }
    }
  },
  methods: {
    setColor: function() {
      if (this.purpose === "showSuccess") {
        return "grey darken-4";
      } else if (this.purpose === "showFail") {
        return "red lighten-1";
      }
    }
  }
};
</script>

<style scoped>
.spinnerCard {
  display: flex;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background-color: #024a07;
  border-radius: 30px;
}
#liftingPlayer1 {
  left: 0;
  top: 0;
  width: 60px !important;
  height: 60px !important;
  border-radius: 0% !important;
  animation: liftingPlayer1 1.5s linear infinite;
}
@-webkit-keyframes liftingPlayer1 {
  0% {
    opacity: 1;
  }
  30% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

#liftingPlayer2 {
  left: 0px;
  top: 0px;
  width: 60px !important;
  height: 60px !important;
  border-radius: 0% !important;
  animation: liftingPlayer2 1.5s linear infinite;
}
@-webkit-keyframes liftingPlayer2 {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

#liftingSpinner {
  width: 100px;
  height: 40px;
  position: relative;
  top: 50%;
  left: 50%;
  margin: -20px -50px;
}
#liftingSpinner div {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
}

#liftingBall {
  width: 15px !important;
  height: 15px !important;
  animation: liftingBall 1.5s linear infinite;
}

@-webkit-keyframes liftingBall {
  0% {
    left: 50px;
    top: -20px;
  }
  35% {
    top: 30px;
  }
  60% {
    top: 0px;
  }
  80% {
    top: -15px;
  }
  100% {
    left: 50px;
    top: -23px;
    transform: rotate(720deg);
  }
}
</style>
