const dialog = {
  data: () => ({}),
  computed: {
    /* dialog 를 mapGetters 가 아닌 set, get 으로 선언한 이유는
       만약, 여백을 클릭해서 dialog 를 닫을 경우 명시적으로 dialog 상태를 변이시킬 수 없기 때문이다. */
    dialog: {
      get() {
        return this.$store.state["common"].dialog;
      },
      set(value) {
        this.$store.commit("common/SET_DIALOG", value);
      }
    },
    type: {
      get() {
        return this.$store.state["common"].type;
      },
      set(value) {
        this.$store.commit("common/SET_TYPE", value);
      }
    }
  },
  methods: {
    setDialog(value) {
      this.$store.commit("common/SET_DIALOG", value);
    },
    setType(value) {
      this.$store.commit("common/SET_TYPE", value);
    },
    // Dialog 와 Type 을 한 번에 변경시키는 함수
    // 여기서의 value 는 object  ex) { dialog:true, type:"manager" }
    setDialogAndType(value) {
      this.$store.commit("common/setDialogAndType", value);
    }
  }
};

export default dialog;
