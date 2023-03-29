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

  static hasBalance(user: any, price: number) {
    console.log(user.balance, price);
    if (user.balance < price) {
      throw new CustomError(['Insufficient balance'], status.badRequest);
    }
  }

  static buyerIsSeller(buyer: number, seller: number) {
    if (buyer === seller) {
      throw new CustomError(
        ['You can not buy from yourself'],
        status.badRequest,
      );
    }
  }
}
