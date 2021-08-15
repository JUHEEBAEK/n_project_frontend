<template>
  <div>
    <v-navigation-drawer v-model="leftDrawer" :temporary="true" app overflow>
      <v-list>
        <v-list-item>
          <v-list-item-content class="float-left">
            <v-list-item-title class="title">NunnuNanna</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list nav>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="item in leftMenus"
            :key="item.title"
            class="nav__item"
            @click="movePage(item)"
          >
            <v-list-item-icon>
              <v-img :src="$imgBaseUrl + item.icon" contain width="24" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text--black" v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    leftDrawer: {
      type: Boolean,
      default: false,
      required: true
    },
    leftMenus: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    // items: CoreValueItem.navigationItems
  }),
  watch: {
    leftDrawer(value) {
      this.$emit("update:setLeftDrawer", value);
      // this.setLeftDrawer(value);
    },
    movePage(to) {
      this.$emit("updateRouter", to);
    }
  }
};
</script>

<style scoped></style>
