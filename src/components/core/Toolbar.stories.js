import Toolbar from "./Toolbart.vue";

export default {
  title: "Core/Toolbar",
  comoponent: Toolbar
};

const Template = (args, { argTypes }) => {
  return {
    components: { Toolbar },
    props: Object.keys(argTypes),
    template: "<Toolbar v-bind='$props' />"
  };
};

export const CoreToolbar = Template.bind({});

Toolbar.args = {
  title: "Nunnu Nanna",
  userInfo: {
    id: 1,
    name: "juhee"
  }
};
