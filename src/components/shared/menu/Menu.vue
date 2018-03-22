<template>
  <md-list>
    <md-list-item v-for="route in rotas" :key="route.path" :to="route.path" @click="escondeMenu()">
      <span>
        <md-icon>{{route.icon}}</md-icon>
        {{route.title}}
      </span>
    </md-list-item>
  </md-list>
</template>

<script>
export default {
  props: {
    rotas: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      menuVisivel: false
    };
  },
  methods: {
    escondeMenu() {
      this.$emit("escondeMenu");
    }
  }
};
</script>

<style scoped>

</style>