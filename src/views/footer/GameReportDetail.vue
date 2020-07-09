<template>
  <div>
    <report-game-info :game_id="game_id"></report-game-info>
    <report-position-view></report-position-view>
    <report-event-list></report-event-list>
  </div>
</template>

<script>
export default {
  name: "TesmSetting",
  props: {
    game_id: {
      type: [String, Number],
      default: null
    }
  },
  created() {}
};
</script>

<style scoped></style>
