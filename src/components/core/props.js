export const rootProps = {
  // global
  currentMenu: {
    type: String,
    default: ""
  },
  leftMenus: {
    type: Array,
    required: true
  },
  footerMenus: {
    type: Array,
    required: true
  },
  // account
  userInfo: {
    type: Object,
    required: true
  },
  signOut: {
    type: Function,
    required: true
  },
  updateMenu: {
    type: Function,
    required: true
  }
};

export const appBarProps = {
  leftDrawer: {
    type: Boolean,
    default: false,
    required: true
  },
  setLeftDrawer: {
    type: Function,
    default: () => {},
    required: true
  },
  userInfo: {
    type: Object,
    default: () => ({
      name: "",
      email: "",
      type: ""
    })
  },
  signOut: {
    type: Function,
    required: true
  }
};

export const leftNavProps = {
  leftDrawer: {
    type: Boolean,
    default: false,
    required: true
  },
  setLeftDrawer: {
    type: Function,
    default: () => {},
    required: true
  },
  currentMenu: {
    type: String,
    default: ""
  },
  leftMenus: {
    type: Array,
    required: true
  },
  footerMenus: {
    type: Array,
    required: true
  },
  updateMenu: {
    type: Function,
    required: true
  }
};

export const mainProps = {
  leftDrawer: {
    type: Boolean,
    default: false,
    required: true
  },
  fullScreen: {
    type: Boolean,
    default: false,
    required: true
  }
};
