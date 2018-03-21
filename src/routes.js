import Cadastro from "./components/cadastro/Cadastro.vue";
import Home from "./components/home/Home.vue";

export const routes = [
  {
    path: "/",
    name: "home",
    title: "Home",
    component: Home,
    menu: true
  },
  {
    path: "/cadastro/:id",
    name: "cadastro",
    title: "Cadastro",
    component: Cadastro
  },
  {
    path: "/cadastro",
    name: "cadastro",
    title: "Cadastro",
    component: Cadastro,
    menu: true
  },
  { path: "*", component: Home }
];
