export default class StringFunctions {
  static getPokemonIdFromUrl(url: string) {
    const stringToGetPokemonId = url.split('/pokemon/')[1];
    const id = stringToGetPokemonId.split('/')[0];
    return Number(id);
  }
};