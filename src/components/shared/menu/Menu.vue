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

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: black;
}

ul {
  list-style: none;
}

li {
  position: relative;
  display: inline-block;
  padding: 10px;
}

a {
  position: relative;
  text-decoration: none;
  color: white;
}
</style>