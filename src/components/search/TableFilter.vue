<template>
  <!-- DataTable 과 함께 사용되는 검색창
  - 본 component 를 호출한 view 는 setSearchQuery method 를 갖고 있어야 한다.-->
  <v-text-field
    :value="searchQuery"
    @input="setSearchQuery"
    :placeholder="label"
    outlined
    hide-details
    autocomplete="off"
    dense
    class="search__input"
    prepend-inner-icon="mdi-magnify"
  />
</template>
<script>
export default {
  props: {
    // 검색창에 표기되는 label
    label: {
      type: String,
      default: "검색"
    }
  },
  data: () => ({
    searchQuery: ""
  }),
  methods: {
    // 사용자가 검색한 내용을 view 에 전달
    setSearchQuery: function(value) {
      this.searchQuery = value;
      this.$emit("setSearchQuery", value);
    }
  }
};
</script>
<style lang="scss" scoped>
.search__input {
  color: #222222;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  height: 34px;
}
</style>
