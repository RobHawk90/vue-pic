<template>
  <div>
    <h1 class="titulo">Lista de Fotos</h1>
    <md-field>
      <md-icon>search</md-icon>
      <label>Digite o nome da foto que deseja filtrar</label>
      <md-input v-model="filtro"/>
    </md-field>
    <transition-group name="fotos" tag="ul" class="md-layout md-gutter">
      <li class="foto md-layout-item md-xlarge-size-20 md-large-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
        :key="foto.titulo" v-for="foto of fotosFiltradas"
      >
        <painel :titulo="foto.titulo" :subtitulo="foto.descricao">
          <imagem :url="foto.url" :titulo="foto.titulo" v-transform:rotate.animar="90"></imagem>
          <div slot="rodape">
            <router-link :to="{name: 'cadastro', params: {id: foto._id}}"><botao icon="edit"/></router-link>
            <botao icon="delete_forever" @confirma="remove(foto)" :perigo="true" :confirmar="true"/>
          </div>
        </painel>
      </li>
    </transition-group>
    <toast :mensagem="mensagem" :exibir="exibirMensagem"/>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import Botao from "../shared/botao/Botao.vue";
import Imagem from "../shared/imagem/Imagem.vue";
import Toast from "../shared/toast/Toast.vue";

import transform from "../../directives/Transform";

import FotoService from "../../domain/fotos/FotoService";

export default {
  components: {
    painel: Painel,
    botao: Botao,
    imagem: Imagem,
    toast: Toast
  },
  directives: {
    transform
  },
  data() {
    return {
      fotos: [],
      filtro: "",
      mensagem: "",
      exibirMensagem: false
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
        this.exibeMensagem(`A foto "${foto.titulo}" foi removida`);
      });
    },
    exibeMensagem(mensagem) {
      this.mensagem = mensagem;
      this.exibirMensagem = true;
    }
  },
  created() {
    this.service = new FotoService(this.$resource);
    this.service
      .lista()
      .then(
        fotos => (this.fotos = fotos),
        err => (this.mensagem = err.message)
      );
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
  margin-bottom: 10px;
}

.fotos-enter,
.fotos-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.fotos-leave-active {
  position: absolute;
}
</style>
