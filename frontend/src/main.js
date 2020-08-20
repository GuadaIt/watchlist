import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
// import VueCarousel from "vue-carousel";
// import VueAgile from "vue-agile";
import { auth } from "./services/firebase";

Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);
// Vue.use(VueCarousel);
// Vue.use(VueAgile);

let app = '';

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});