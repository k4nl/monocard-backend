export class PokemonApi {
  id: any;
  poke_api_id: any;
  poke_infos: any;
  constructor(data: { id: any; poke_api_id: any; poke_infos: any }) {
    this.id = data.id;
    this.poke_api_id = data.poke_api_id;
    this.poke_infos = data.poke_infos;
  }
}
