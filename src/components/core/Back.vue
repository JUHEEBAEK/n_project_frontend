<template>
  <v-toolbar>
    <v-btn icon @click="backPage">
      <v-icon class="fas fa-arrow-left" />
    </v-btn>
    <v-spacer />
    <v-toolbar-title>{{ tableHeader }}</v-toolbar-title>
    <v-spacer />
  </v-toolbar>
</template>

<script>
export default {
  name: "back",
  props: ["tableHeader"],
  methods: {
    backPage() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped></style>
