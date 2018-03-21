<template>
  <div class="corpo">
    <meu-menu :rotas="routes"></meu-menu>
    <div class="conteudo">
      <transition name="pagina">
        <router-view></router-view>
      </transition>
    </div>
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
    return { routes };
  }
};
</script>

<style scoped>
div.corpo {
  font-family: Helvetica, sans-serif;
  margin: 0 auto;
  width: 96%;
}

.conteudo {
  margin-top: 50px;
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

