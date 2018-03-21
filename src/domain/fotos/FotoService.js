export default class FotoService {
  constructor(resource) {
    this._resource = resource("v1/fotos{/id}");
  }

  salva(foto) {
    if (foto._id)
      return this._resource.update({ id: foto._id }, foto).then(null, err => {
        console.log(err);
        throw new Error(`Não foi possível atualizar a foto "${foto.nome}".`);
      });

    return this._resource.save(foto).then(null, err => {
      console.log(err);
      throw new Error(`Não foi possível gravar a foto "${foto.nome}".`);
    });
  }

  lista() {
    return this._resource.query().then(
      fotos => fotos.json(),
      err => {
        console.log(err);
        throw new Error("Não foi possível listar as fotos.");
      }
    );
  }

  remove(id) {
    return this._resource.delete({ id }).then(null, err => {
      console.log(err);
      throw new Error("Não foi possível remover a foto.");
    });
  }

  busca(id) {
    return this._resource.get({ id }).then(
      foto => foto.json(),
      err => {
        console.log(err);
        throw new Error("Não foi possível buscar a foto.");
      }
    );
  }
}
