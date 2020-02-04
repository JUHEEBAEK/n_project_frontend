import moment from "moment";

const VueMoment = {
  install(Vue) {
    Vue.prototype.$moment = moment
  }
};

export default VueMoment;
