import status from 'src/utils/Status';
import { CustomError } from 'src/utils/CustomError';

export default class Verifier {
  static verifyResponse(response: any) {
    if (response.status !== status.success)
      throw new CustomError(['Pokemon not found'], status.notFound);
  }
}
