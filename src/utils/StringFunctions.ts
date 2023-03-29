export default class StringFunctions {
  static getPokemonIdFromUrl(url: string) {
    const stringToGetPokemonId = url.split('/pokemon/')[1];
    const id = stringToGetPokemonId.split('/')[0];
    return Number(id);
  }

  static createPokemonId(id?: number, url?: string) {
    if (id) return id;
    if (url) return StringFunctions.getPokemonIdFromUrl(url);
    return null;
  }
}
