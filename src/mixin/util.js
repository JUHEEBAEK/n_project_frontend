import {
  createNamespacedHelpers,
  mapGetters
} from "vuex";
const {
  mapMutations: commonMapMutations
} = createNamespacedHelpers("common");

const util = {
  data: () => ({
    // 스낵바를 보여주기 위한 목적 : showSuccess || showFail
    snackBarPurpose: null,
    // 스낵바에 들어가는 내용
    snackBarMessage: null,
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
    ...commonMapMutations(["SET_SNACK_BAR"]),
    // snackBar 를 여는 함수. (snackBar 는 자동으로 닫히기 때문에 SnackBar 를 닫는 함수는 필요없다)
    setSnackBar(purpose, message) {
      console.log("???????");
      // purpose : showSuccess or showFail
      this.snackBarPurpose = purpose;
      this.snackBarMessage = message;
      this.SET_SNACK_BAR(true);
    }
  }
};

export default util;