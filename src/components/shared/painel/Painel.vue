<template>
  <md-card class="painel" md-with-hover>
    <md-card-header>
      <md-card-header-text>
        <div @click="mostrarCorpo = !mostrarCorpo">
          <div class="md-title">{{titulo}}</div>
          <div class="md-subhead" v-if="subtitulo">{{subtitulo}}</div>
        </div>
      </md-card-header-text>
    </md-card-header>
    <transition name="painel-fade">
      <div class="painel-corpo" v-show="mostrarCorpo">
        <md-card-media>
          <slot></slot>
        </md-card-media>
        <md-card-actions>
          <slot name="rodape"></slot>
        </md-card-actions>
      </div>
    </transition>
  </md-card>
</template>

<script>
export default {
  props: ["titulo", "subtitulo"],
  data() {
    return {
      mostrarCorpo: true
    };
  }
};
</script>

<style scoped>
.painel-fade-enter,
.painel-fade-leave-active {
  opacity: 0;
}

.painel-fade-enter-active,
.painel-fade-leave-active {
  transition: 300ms;
}
</style>
