<template>
  <div>
    <core-Toolbar />
    <core-navigation />
    <h2>hello {{ message }}</h2>
  </div>
</template>

<script>
export default {
  data: () => ({
    message: "Wolrd!!",
  }),
};
</script>

<style scoped></style>
