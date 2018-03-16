<template>
  <nav>
    <ul>
      <li :key="route.path" v-for="route in rotas">
        <router-link :to="route.path">{{route.title}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    rotas: {
      type: Array,
      required: true
    }
  }
};
</script>

