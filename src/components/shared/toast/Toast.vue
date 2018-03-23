<template>
  <md-snackbar md-position="center" :md-duration="5000" :md-active.sync="exibir" md-persistent>
    <span>{{mensagem}}</span>
    <md-button class="md-primary" @click="exibir = false">OK</md-button>
  </md-snackbar>
</template>

<script>
export default {
  props: ["mensagem", "exibir"]
};
</script>

<style>

</style>