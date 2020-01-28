<template>
  <v-container>
    <core-Back :tableHeader="title" />
    <member-Add />
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: "MEMBER ADD"
  })
};
</script>

<style scoped></style>
