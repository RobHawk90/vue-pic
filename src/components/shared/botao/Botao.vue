<template>
  <button class="botao" :class="estiloSelecionado" @click="confirmacao()">{{label}}</button>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
      type: String
    },
    estilo: String,
    confirmar: Boolean
  },
  computed: {
    estiloSelecionado() {
      if (this.estilo === "perigo") return "botao-perigo";
      return "botao-padrao";
    }
  },
  methods: {
    confirmacao() {
      if (!this.confirmar) return this.$emit("confirma");
      if (confirm("Confirmar operação?")) this.$emit("confirma");
    }
  }
};
</script>

<style scoped>
.botao {
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  font-size: 1.2em;
}

.botao-perigo {
  background: firebrick;
  color: white;
}

.botao-padrao {
  background: darkcyan;
  color: white;
}
</style>
