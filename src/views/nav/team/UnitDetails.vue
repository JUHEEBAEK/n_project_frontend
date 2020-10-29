<template>
  <div>
    Unit Team
    <v-row justify="start">
      <v-col cols="12">
        <core-breadcrumbs :items="items" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        text: "팀 관리",
        disabled: false,
        href: "/team-admin",
      },
      {
        text: "유닛 팀 상세 정보",
        disabled: true,
      }
    ]
  })
}
</script>

<style>

</style>