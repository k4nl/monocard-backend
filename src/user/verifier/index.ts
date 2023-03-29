import status from 'src/utils/Status';
import { CustomError } from 'src/utils/CustomError';

interface UserFound {
  id: number;
  name: string;
  balance: number;
}

export default class Verifier {
  static foundUser(user: UserFound) {
    if (!user) {
      throw new CustomError(['User not found'], status.notFound);
    }
  }
}
