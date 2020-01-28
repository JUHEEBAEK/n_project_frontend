<template>
  <div>
    <core-Toolbar />
    <core-navigation />
    <member-toolbar />
    <member-cardList />
  </div>
</template>

<script>
export default {
  name: "memberList",
  data: () => ({
    title: "MEMBER"
  })
};
</script>

<style scoped></style>
