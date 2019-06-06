import Vue from "vue";

import {
  MdContent,
  MdButton,
  MdDialog,
  MdDialogAlert
} from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(MdContent);
Vue.use(MdButton);
Vue.use(MdDialog);
Vue.use(MdDialogAlert);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
