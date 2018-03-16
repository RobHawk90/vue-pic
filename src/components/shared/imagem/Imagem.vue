<template>
  <img class="responsiva" :src="url" :alt="titulo">
</template>

<script>
export default {
  props: ["url", "titulo"]
};
</script>

<style scoped>
img.responsiva {
  width: 100%;
}
</style>

