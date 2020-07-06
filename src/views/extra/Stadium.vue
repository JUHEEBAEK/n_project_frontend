<template>
  <div>
    <v-btn @click="moveAddPage"> 추가 </v-btn>
    <stadium-cardList />
  </div>
</template>

<script>
export default {
  name: "stadiumList",
  data: () => ({
    title: "STADIUM"
  }),
  methods: {
    moveAddPage(){
      this.$router.push({
        name: "stadiumAdd",
      });
    }
  },
};
</script>

<style scoped></style>
