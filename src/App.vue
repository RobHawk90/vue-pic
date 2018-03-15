<template>
  <div class="corpo">
    <h1 class="titulo-centralizado">{{titulo}}</h1>
    <input class="filtro" @input="filtro = $event.target.value" placeholder="Digite o nome da foto que deseja filtrar">
    <ul class="fotos">
      <li class="foto" :key="foto.titulo" v-for="foto of fotosFiltradas">
        <meu-painel :titulo="foto.titulo">
          <img class="responsiva" :src="foto.url" :alt="foto.titulo">
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "./components/shared/painel/Painel.vue";

export default {
  components: {
    "meu-painel": Painel
  },
  data() {
    return {
      titulo: "Vue Pic",
      fotos: [],
      filtro: ""
    };
  },
  computed: {
    fotosFiltradas() {
      if (this.filtro) {
        let regex = new RegExp(this.filtro.trim(), "i"); // compare removendo espacos e case insensitive
        return this.fotos.filter(foto => regex.test(foto.titulo));
      } else return this.fotos;
    }
  },
  created() {
    this.$http
      .get("http://localhost:3000/v1/fotos")
      .then(res => res.json())
      .then(fotos => (this.fotos = fotos));
  }
};
</script>

<style>
div.corpo {
  font-family: Helvetica, sans-serif;
  margin: 0 auto;
  width: 96%;
}

h1.titulo {
  text-align: center;
}

ul.fotos {
  list-style: none;
}

li.foto {
  display: inline-block;
}

img.responsiva {
  width: 100%;
}

input.filtro {
  width: 100%;
  padding: 7px;
  border: 1px solid #ccc;
  transition: 250ms;
}

input.filtro:focus {
  border-color: #48f;
}
</style>
