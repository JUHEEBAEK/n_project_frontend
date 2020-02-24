<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="alert" :timeout="timeout">
      {{ message }}
      <v-btn color="pink" text @click="closeSnackBar">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("common");
export default {
  data: () => ({
    timeout: 5000,
    message: "수정되었습니다."
  }),
  computed: {
    ...mapState(["alert"])
  },
  methods: {
    ...mapMutations(["SET_ALERT"]),
    closeSnackBar() {
      this.SET_ALERT(false);
    }
  }
};
</script>

<style scoped>
.alert__container {
  position: absolute;
  left: 50%;
  z-index: 1;
}
</style>
