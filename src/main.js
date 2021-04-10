import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueChatScroll from "vue-chat-scroll";
import axios from "axios";

Vue.prototype.$axios = axios.create({
  baseURL: "https://curly-duck-4.loca.lt/bot/",
});

Vue.use(VueChatScroll);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
