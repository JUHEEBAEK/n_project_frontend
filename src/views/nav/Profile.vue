<template>
  <v-container>
    <core-alert />
    <member-Details />
  </v-container>
</template>

<script>
  import { createNamespacedHelpers } from "vuex";
  const { mapActions } = createNamespacedHelpers("member");

  export default {
  data: () => ({
  }),
  created() {
    let member_id = this.$route.params.id;
    console.log(this.$route.params.id);
    this.details_member(member_id);
  },
  methods: {
    ...mapActions(["details_member"])
  }
};
</script>

<style scoped></style>
