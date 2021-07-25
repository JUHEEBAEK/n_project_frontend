import SnackBar from "./SnackBar.vue";

export default {
  title: "Common/SnackBar",
  component: SnackBar
};

const Template = (args, { argTypes }) => {
  return {
    components: { SnackBar },
    props: Object.keys(argTypes),
    template: '<snack-bar v-bind="$props" v-on="$props" />'
  };
};

export const SnackBarStatus = Template.bind({});
SnackBarStatus.args = {
  show: true,
  //   isButton: false,
  message: "Complete",
  purpose: "showSuccess",
  timeout: 2000
};
