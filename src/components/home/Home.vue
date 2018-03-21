<template>
  <div>
    <h1 class="titulo">{{titulo}}</h1>
    <input class="filtro" @input="filtro = $event.target.value" placeholder="Digite o nome da foto que deseja filtrar">
    <ul class="fotos">
      <li class="foto" :key="foto.titulo" v-for="foto of fotosFiltradas">
        <painel :titulo="foto.titulo">
          <imagem :url="foto.url" :titulo="foto.titulo" v-transform:rotate.animar="90"></imagem>
          <botao label="Remover" @confirma="remove(foto)" estilo="perigo" :confirmar="true"></botao>
        </painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import Botao from "../shared/botao/Botao.vue";
import Imagem from "../shared/imagem/Imagem.vue";

import transform from "../../directives/Transform";

import FotoService from "../../domain/fotos/FotoService";

export default {
  components: {
    painel: Painel,
    botao: Botao,
    imagem: Imagem
  },
  directives: {
    transform
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
  methods: {
    remove(foto) {
      this.service.remove(foto._id).then(() => {
        let index = this.fotos.indexOf(foto);
        this.fotos.splice(index, 1);
      });
    }
  },
  created() {
    this.service = new FotoService(this.$resource);
    this.service.lista().then(fotos => (this.fotos = fotos));
  }
};
</script>

<style scoped>
h1.titulo {
  text-align: center;
}

ul.fotos {
  list-style: none;
}

li.foto {
  display: inline-block;
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
