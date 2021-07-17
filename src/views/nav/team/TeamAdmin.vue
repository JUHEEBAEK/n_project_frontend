<template>
  <div>
    <team-search :title="title" :is-add-button="isAddButton" />
    <team-table-list />
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
    title: "팀 관리",
    isAddButton: true
  }),
  created() {}
};
</script>

<style>
</style>