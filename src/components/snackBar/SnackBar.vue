<template>
  <v-snackbar
    v-if="snackBar.show && snackBar.purpose"
    v-model="snackBar"
    :color="setColor()"
    multi-line
    :timeout="timeout"
  >
    <v-icon v-if="icon" size="20" :color="textColor">mdi-{{ icon }}</v-icon>
    <span class="subtitle">{{ snackBar.message }}</span>
  </v-snackbar>
</template>

<script>
import sleep from "@/utils/sleep";
export default {
  name: "SnackBar",
  props: {
    snackBar: {
      type: Object,
      required: true
    },
    timeout: {
      type: Number,
      default: 2000
    }
  },
  data: () => ({
    show: false,
    color: null,
    textColor: null,
    icon: null,
    multiLine: true,
    rounded: "pill"
  }),
  watch: {
    snackBar: {
      immediate: true,
      async handler({ show, purpose }) {
        if (show) {
          this.show = true;
        }

        this.setColor(purpose);
        await sleep(this.timeout);
        this.reset();
      }
    }
  },
  methods: {
    reset() {
      this.show = false;
    },
    setColor(purpose) {
      if (purpose === "showSuccess") {
        this.color = "light-green";
        this.textColor = "white";
        this.icon = "check-circle-outline";
      } else if (purpose === "showWarn") {
        this.color = "yellow";
        this.textColor = "black";
        this.icon = "alert-outline";
      } else if (purpose === "showFail") {
        this.color = "red";
        this.textColor = "white";
        this.icon = "alert-outline";
      } else {
        this.color = null;
        this.textColor = "white";
        this.icon = null;
      }
    }
  }
};
</script>
