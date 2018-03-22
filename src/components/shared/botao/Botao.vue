<template>
  <md-button :class="[{'md-accent': perigo}, shape]" :md-ripple="true" @click="confirmacao()">
    <md-icon v-if="icon">{{icon}}</md-icon>
    {{label}}
  </md-button>
</template>

<script>
export default {
  props: {
    label:String,
    icon: String,
    perigo: Boolean,
    confirmar: Boolean
  },
  computed: {
    shape() {
      if (this.label) return "md-raised";
      return "md-icon-button";
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

</style>
