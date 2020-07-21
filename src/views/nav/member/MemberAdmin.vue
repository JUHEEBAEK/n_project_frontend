<template>
  <div>
    <member-search :title="title" :isAddButton="isAddButton"></member-search>
    <member-table-list></member-table-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: "회원 관리",
    isAddButton: true
  })
};
</script>

<style>
</style>