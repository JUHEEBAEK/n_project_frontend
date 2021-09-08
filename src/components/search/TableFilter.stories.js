import TableFilter from "./TableFilter.vue";

export default {
  title: "Search/TextFilter",
  components: TableFilter
};

const Template = (args, { argTypes }) => {
  return {
    components: { TableFilter },
    props: Object.keys(argTypes),
    template: "<table-filter v-bind='$props' v-on='$props' />"
  };
};

export const TableFilterStatus = Template.bind({});
TableFilterStatus.args = {
  searchQuery: "",
  label: "검색"
};
