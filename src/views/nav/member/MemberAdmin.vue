<template>
  <div>
    <member-search :title="title" :isAddButton="isAddButton"></member-search>
    <member-table-list></member-table-list>
    <util-snack-bar
      v-if="snackBar === true"
      :purpose="snackBarPurpose"
      :message="snackBarMessage"
    />
  </div>
</template>

<script>
import util from "../../../mixins/util.js";

export default {
  mixins: [util],
  data: () => ({
    title: "회원 관리",
    isAddButton: true
  }),
  created() {}
};
</script>

<style>
</style>