<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-if="purpose === 'showSuccess' || purpose === 'showFail'"
      v-model="snackBar"
      :color="setColor"
      multi-line
      :timeout="timeout"
    >
      <span class="subtitle">{{ message }}</span>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "완료되었습니다"
    },
    purpose: {
      type: String,
      defalult: "showSuccess"
    },
    timeout: {
      type: Number,
      default: 2000
    }
  },
  created() {},
  data: () => ({}),
  computed: {
    snackBar: {
      get() {
        return this.$store.state["common"].snackBar;
      }
    },
    setColor() {
      console.log("setColor");
      if (this.purpose === "showSuccess") {
        return null;
      } else if (this.purpose === "showFail") {
        return "red lighten-1";
      }
    }
  }
};
</script>

<style scoped></style>
