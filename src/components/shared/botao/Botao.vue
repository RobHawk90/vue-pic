<template>
  <div>
    <md-button :class="[color, shape]" :md-ripple="true" @click="confirmacao()">
      <md-icon v-if="icon">{{icon}}</md-icon>
      {{label}}
    </md-button>

    <md-dialog-confirm 
      md-title="Confirmar operação?"
      md-content="Esta operação pode ser irreverssível"
      md-confirm-text="Confirmar"
      md-cancel-text="Cancelar"
      :md-active.sync="active"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"/>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    icon: String,
    perigo: Boolean,
    confirmar: Boolean
  },
  data() {
    return { active: false };
  },
  computed: {
    color() {
      if (this.perigo) return "md-accent";
      return "md-primary";
    },
    shape() {
      if (this.label) return "md-raised";
      return "md-icon-button";
    }
  },
  methods: {
    confirmacao() {
      if (!this.confirmar) return this.$emit("confirma");
      this.active = true;
    },
    onCancel() {
      this.$emit("cancela");
    },
    onConfirm() {
      this.$emit("confirma");
    }
  }
};
</script>

<style scoped>
div {
  display: inline-block;
}
</style>
