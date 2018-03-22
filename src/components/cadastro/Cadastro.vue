<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 v-if="foto._id" class="centralizado">Atualização</h2>
    <h2 v-else class="centralizado">Gravação</h2>
    <h2 class="centralizado">{{foto.titulo}}</h2>

    <div class="md-layout md-gutter md-alignment-center">
      <md-card class="md-layout-item md-xlarge-size-40 md-large-size-40 md-medium-size-45 md-small-size-50 md-xsmall-size-100">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">Dados da foto</div>
          </md-card-header-text>
        </md-card-header>
        <md-card-content>
          <form @submit.prevent="salva()">
            <md-field :class="hasError('titulo')">
              <label>Título</label>
              <md-input name="titulo" autocomplete="off"
                v-validate data-vv-rules="required|min:3|max:30" data-vv-as="Título"
                v-model.lazy="foto.titulo"
              />
              <span class="md-error">{{errors.first('titulo')}}</span>
            </md-field>
            <md-field :class="hasError('url')">
              <label>URL</label>
              <md-input name="url" autocomplete="off"
                v-validate data-vv-rules="required" data-vv-as="URL"
                v-model.lazy="foto.url"
              />
              <span class="md-error">{{errors.first('url')}}</span>
            </md-field>
            <md-field>
              <label>Descrição</label>
              <md-textarea autocomplete="off" v-model="foto.descricao"/>
            </md-field>
            <div class="centralizado">
              <botao label="SALVAR" @confirma="salva()"/>
              <router-link :to="{name: 'home'}"><botao label="VOLTAR"/></router-link>
            </div>
          </form>
        </md-card-content>
      </md-card>
      <div v-show="foto.url"
        class="md-layout-item md-xlarge-size-40 md-large-size-40 md-medium-size-45 md-small-size-50 md-xsmall-size-100"
      >
      <md-card>
        <md-card-media>
          <imagem :url="foto.url" :titulo="foto.titulo" />
        </md-card-media>
      </md-card>
      </div>
    </div>
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
    },
    hasError(field) {
      return {
        "md-invalid": this.errors.has(field)
      };
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
.imagem {
  border: 1px solid #ccc;
}
</style>