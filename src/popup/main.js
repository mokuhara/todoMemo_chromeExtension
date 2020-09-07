import Vue from "vue";
import App from "./App.vue";
import router from "../router";
import store from "../store";

import TextareaAutosize from "vue-textarea-autosize";
import VCalendar from "v-calendar";

Vue.use(TextareaAutosize);
Vue.use(VCalendar);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: "#app",
  render: (h) => h(App),
});
