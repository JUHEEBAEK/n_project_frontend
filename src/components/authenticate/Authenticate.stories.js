import Authenticate from "./Authenticate.vue";
import Login from "@/views/login/Login.vue";

const Root = {
  template: `<div>
      Welcome Root
    </div>`,
  methods: {
    signOut() {
      alert("Success Sign Out");
    }
  }
};

const ExtendLogin = {
  name: "extend-login",
  extends: Login,
  methods: {
    movePage: function() {
      alert("Success Sign In");
    }
  }
};

export default {
  title: "Components/Authenticate",
  component: {
    Authenticate
  }
};

const Template = (args, { argTypes }) => {
  return {
    components: {
      Authenticate,
      login: ExtendLogin,
      root: Root
    },
    props: Object.keys(argTypes),
    template: `<authenticate v-bind="$props">
        <template v-slot:login>
          <login v-bind="$props" />
        </template>
        <template v-slot:root>
          <root v-bind="$props" />
        </template>
      </authenticate>
    `
  };
};

export const withDefault = Template.bind({});
withDefault.args = {
  language: "eng",
  isAuthenticate: false,
  signIn: () => alert("Click Sign IN")
};
