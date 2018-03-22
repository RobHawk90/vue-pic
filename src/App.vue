<template>
  <div class="page-container">
    <md-app md-mode="reveal" class="conteudo">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="escondeMenu">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Vue Pic</span>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisivel">
        <md-toolbar class="md-transparent" md-elevation="0">Menu</md-toolbar>
        <meu-menu :rotas="routes" @escondeMenu="escondeMenu()"/>
      </md-app-drawer>
      <md-app-content>
        <transition name="pagina">
          <router-view/>
        </transition>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Menu from "./components/shared/menu/Menu.vue";
import { routes } from "./routes";

export default {
  components: {
    "meu-menu": Menu
  },
  data() {
    return {
      routes: routes.filter(route => route.menu),
      menuVisivel: false
    };
  },
  methods: {
    escondeMenu() {
      this.menuVisivel = !this.menuVisivel;
    }
  }
};
</script>

<style lang="scss">
@import "~vue-material/src/components/MdAnimation/variables";
@import "~vue-material/src/theme/engine";

.md-layout-item {
  margin-top: 8px;
  margin-bottom: 8px;
  transition: 0.3s;
}

.conteudo {
  min-height: 100vh;
}

.pagina-enter,
.pagina-leave-active {
  opacity: 0;
}

.pagina-enter-active,
.pagina-leave-active {
  transition: 300ms;
}
</style>

