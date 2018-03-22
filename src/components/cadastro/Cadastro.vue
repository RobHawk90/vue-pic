<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 v-if="foto._id" class="centralizado">Atualização</h2>
    <h2 v-else class="centralizado">Gravação</h2>
    <h2 class="centralizado">{{foto.titulo}}</h2>

    <form @submit.prevent="salva()">
      <div class="controle">
        <label>TÍTULO</label>
        <input name="titulo" autocomplete="off"
          v-validate data-vv-rules="required|min:3|max:30" data-vv-as="TÍTULO"
          v-model.lazy="foto.titulo">
        <span class="erro" v-show="errors.has('titulo')">{{errors.first('titulo')}}</span>
      </div>

      <div class="controle">
        <label>URL</label>
        <input name="url" autocomplete="off"
          v-validate data-vv-rules="required" data-vv-as="URL"
          v-model.lazy="foto.url">
        <span class="erro" v-show="errors.has('url')">{{errors.first('url')}}</span>
        <imagem v-show="foto.url" :url="foto.url" :titulo="foto.titulo" />
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
      </div>

      <div class="centralizado">
        <botao label="SALVAR"/>
        <router-link :to="{name: 'home'}"><botao label="VOLTAR"/></router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Imagem from "../shared/imagem/Imagem.vue";
import Botao from "../shared/botao/Botao.vue";

import Foto from "../../domain/fotos/Foto";
import FotoService from "../../domain/fotos/FotoService";

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
    salva() {
      this.$validator
        .validateAll()
        .then(
          success => {
            if (success) return this.service.salva(this.foto);
          },
          err => console.log(err)
        )
        .then(() => {
          if (this.foto._id) this.$router.push({ name: "home" });
          this.foto = new Foto();
        });
    }
  },
  created() {
    this.service = new FotoService(this.$resource);
    let id = this.$route.params.id;
    if (id) this.service.busca(id).then(foto => (this.foto = foto));
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

.erro {
  color: red;
}
</style>