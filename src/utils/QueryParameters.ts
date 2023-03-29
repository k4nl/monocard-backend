export default class QueryParameters {
  query: any;
  availableFilters: string[];
  constructor(query?: any) {
    this.query = query;
    this.availableFilters = ['types', 'range', 'name'];
  }

  types() {
    const types = this.query.types.split(',');
    return types;
  }

  range() {
    const range = this.query.range.split(',');
    const rangeObj = {};
    range.forEach((item: string) => {
      const [key, value] = item.split('_');
      const number = Number(value);
      if (number) {
        rangeObj[key] = number;
      }
    });
    return rangeObj;
  }

  name() {
    const name = this.query.name;
    return name;
  }

  getFilters() {
    if (!this.query) return null;
    const filters = {};
    this.availableFilters.forEach((filter: string) => {
      if (this.query[filter]) {
        filters[filter] = this[filter]();
      }
    });
    if (Object.keys(filters).length === 0) return null;
    return filters;
  }

  static verifyName(name: string, pokemon: any) {
    if (!pokemon.name.includes(name)) return false;
    return true;
  }

  static verifyRange(range: any, pokemon: any) {
    const entries = Object.entries(range);
    const everyFilterMatch = entries.every(([key, value]) => {
      const pokemonStats = pokemon.stats.find(({ stat }) => stat.name === key);
      if (pokemonStats.base_stat <= value) return true;
      return false;
    });
    if (!everyFilterMatch) return false;
    return true;
  }

  static verifyTypes(types: string[], pokemon: any) {
    const pokemonTypes = pokemon.types.map(({ type }) => type.name);
    const someTypeMatch = types.some((type) => pokemonTypes.includes(type));
    if (!someTypeMatch) return false;
    return true;
  }

  static verifyFilters(
    filters: { name?: string; range?: any; types?: string[] },
    pokemon: any,
  ) {
    if (!filters) return pokemon;
    const entries = Object.entries(filters);
    for (const [key, value] of entries) {
      const verifyFn =
        this[`verify${key.charAt(0).toUpperCase() + key.slice(1)}`];
      if (verifyFn && !verifyFn(value, pokemon)) {
        return null;
      }
    }
    return pokemon;
  }
}
