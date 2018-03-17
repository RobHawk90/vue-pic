<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{foto.titulo}}</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input id="titulo" autocomplete="off" v-model.lazy="foto.titulo">
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model.lazy="foto.url">
        <imagem v-show="foto.url" :url="foto.url" :titulo="foto.titulo" />
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
      </div>

      <div class="centralizado">
        <botao label="GRAVAR"/>
        <router-link to="/"><botao label="VOLTAR"/></router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Imagem from "../shared/imagem/Imagem.vue";
import Botao from "../shared/botao/Botao.vue";

import Foto from "../../domain/fotos/Foto";

export default {
  components: {
    imagem: Imagem,
    botao: Botao
  },
  data() {
    return {
      foto: new Foto()
    };
  },
  methods: {
    grava() {
      this.$http
        .post("http://localhost:3000/v1/fotos", this.foto)
        .then(() => (this.foto = new Foto()), err => console.log(err));
    }
  }
};
</script>
<style scoped>
.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralizado {
  text-align: center;
}
</style>