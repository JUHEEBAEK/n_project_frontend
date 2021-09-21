<template>
  <v-breadcrumbs :items="items" class="pa-3">
    <template v-slot:divider>
      <v-icon>fas fa-angle-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style></style>
