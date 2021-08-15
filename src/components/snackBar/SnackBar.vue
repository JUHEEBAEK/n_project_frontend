<template>
  <v-snackbar
    v-if="snackBar.show && snackBar.purpose && snackBarData"
    :value="show"
    multi-line
    :timeout="timeout"
    :color="snackBarData.color"
  >
    <v-icon v-if="snackBarData.icon" size="20" :color="snackBarData.textColor">mdi-{{ snackBarData.icon }}</v-icon>
    <span class="subtitle" :class="`${snackBarData.textColor}--text`">{{ snackBar.message }}</span>
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
    multiLine: true,
    rounded: "pill",

    snackBarData: null,
    snackBarType: {
      showSuccess: {
        icon: "check-circle-outline",
        color: "light-green",
        textColor: "white"
      },
      showWarn: {
        icon: "alert-outline",
        color: "yellow",
        textColor: "black"
      },
      showFail: {
        icon: "alert-outline",
        color: "red",
        textColor: "white"
      },
      default: {
        icon: null,
        color: null,
        textColor: "white"
      }
    }
  }),
  watch: {
    snackBar: {
      immediate: true,
      async handler({ show, purpose }) {
        if (show) this.show = true;
        this.snackBarData = purpose && show ? this.snackBarType[purpose] : null;
        await sleep(this.timeout);
        this.reset();
      }
    }
  },
  methods: {
    reset() {
      this.show = false;
    }
  }
};
</script>
