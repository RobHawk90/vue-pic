import Vue from "vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import VueMaterial from "vue-material";
import VeeValidate from "vee-validate";

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import ptBR from "vee-validate/dist/locale/pt_BR";

import App from "./App.vue";
import { routes } from "./routes";

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueMaterial);
Vue.use(VeeValidate, {
  locale: ptBR.name,
  dictionary: {
    pt_BR: {
      messages: ptBR.messages
    }
  }
});
Vue.http.options.root = "http://localhost:3000";
Vue.http.interceptors.push((req, next) => {
  console.info(`request ${req.method} to ${req.url}`);
  next(res => console.info(`response ${res.status} from ${res.url}`));
});

const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
