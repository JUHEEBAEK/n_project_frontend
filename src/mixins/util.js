import {
  createNamespacedHelpers,
  mapGetters
} from "vuex";
const {
  mapMutations: commonMapMutations
} = createNamespacedHelpers("common");

const util = {
  data: () => ({
    // snackBar 실패 메세지
    snackBarFail: "showFail",
    // snackBar 성공 메세지
    snackBarSuccess: "showSuccess"
  }),
  computed: {
    ...mapGetters("common", {
      loading: "loading"
    }),
    ...mapGetters("common", {
      snackBar: "snackBar"
    })
  },
  methods: {
    ...commonMapMutations(["SET_SNACK_BAR", "SET_SNACK_BAR_PURPOSE", "SET_SNACK_BAR_MESSAGE", "SET_LOADING_BAR"]),
    // LoadingBar 를 제어하는 함수 ( value 가 true 면 로딩바 제공, false 면 로딩바 제거 )
    setLoadingBar(value) {
      this.SET_LOADING_BAR(value);
    },
    // snackBar 를 여는 함수. (snackBar 는 자동으로 닫히기 때문에 SnackBar 를 닫는 함수는 필요없다)
    setSnackBar(purpose, message) {
      console.log("purpose", purpose);
      console.log("message", message);
      // purpose : showSuccess or showFail
      this.snackBarPurpose = purpose;
      this.snackBarMessage = message;
      this.SET_SNACK_BAR(true);
      this.SET_SNACK_BAR_PURPOSE(purpose);
      this.SET_SNACK_BAR_MESSAGE(message);
    },
    setDialogAndType(value) {
      this.$store.commit("common/SET_DIALOG_AND_TYPE", value);
    }
  }
};

export default util;