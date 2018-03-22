import Vue from "vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import VeeValidate from "vee-validate";
import ptBR from "vee-validate/dist/locale/pt_BR";

import App from "./App.vue";
import { routes } from "./routes";

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VeeValidate, {
  locale: ptBR.name,
  dictionary: {
    pt_BR: {
      messages: ptBR.messages
    }
  }
});
Vue.http.options.root = "http://localhost:3000";

const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
