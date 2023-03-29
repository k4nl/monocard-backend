export class PokemonApi {
  id: number;
  poke_api_id: number;
  poke_infos: any;
  constructor(data: { id: number; poke_api_id: number; poke_infos: any }) {
    this.id = data.id;
    this.poke_api_id = data.poke_api_id;
    this.poke_infos = data.poke_infos;
  }
}
