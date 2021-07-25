<script>
export default {
  name: "Authenticate",
  props: {
    isAuthenticate: {
      type: Boolean,
      default: false,
      require: true
    }
  },
  render(h) {
    if (!this.isAuthenticate) {
      return h("div", {}, this.$slots.login);
    }
    return h("div", {}, this.$slots.root);
  }
};
</script>
