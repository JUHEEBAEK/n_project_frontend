export const appBarProps = {
  leftDrawer: {
    type: Boolean,
    default: false,
    required: true
  },
  userInfo: {
    type: Object,
    default: () => ({
      name: "",
      email: "",
      type: ""
    })
  }
};

export const leftNavProps = {
  leftDrawer: {
    type: Boolean,
    default: false,
    required: true
  },
  currentMenu: {
    type: String,
    default: ""
  },
  leftMenus: {
    type: Array,
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

export const footerProps = {
  currentMenu: {
    type: String,
    default: ""
  },
  footerMenus: {
    type: Array,
    required: true
  }
};
