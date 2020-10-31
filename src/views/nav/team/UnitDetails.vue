<template>
  <div>
    <div class="main__title">
      <core-breadcrumbs :items="items" />
    </div>
    <div class="main__header"></div>
    <div class="main__content">
      <div class="main__left"></div>
      <div class="main__right"></div>
    </div>
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

<style lang="scss" src="@/assets/scss/views/nav/team/unitTeam.scss" scoped></style>
