import Login from "./Login.vue";

// ID: juhee.baek@fitogether.com
// PW: qwer1234%g

export default {
  title: "Views/Login",
  component: Login
};

const Template = (args, { argTypes }) => {
  return {
    components: { Login },
    props: Object.keys(argTypes),
    template: `<login v-bind="$props" />`
  };
};

export const withDefault = Template.bind({});
withDefault.args = {
  language: "eng",
  signIn: () => {
    alert("Sign In");
    return { success: true };
  }
};
