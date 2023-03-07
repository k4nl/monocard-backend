import status from 'src/utils/Status';
import { CustomError } from 'src/utils/CustomError';

export default class Verifier {
  static hasPokemonAvailable(pokemon: any) {
    if (!pokemon) {
      throw new CustomError(['Pokemon not found'], status.notFound);
    }
  }

  static updatePokemonAvailable(pokemon: any) {
    if (!pokemon) {
      throw new CustomError(['Could not update'], status.badRequest);
    }
  }

  static deletePokemonAvailable(pokemon: any) {
    if (!pokemon) {
      throw new CustomError(['Could not delete'], status.badRequest);
    }
  }
}
