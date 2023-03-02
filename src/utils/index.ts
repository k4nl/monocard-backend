import * as bcrypt from 'bcrypt';

export default class Utils {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(
    password: string,
    receivedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, receivedPassword);
  }
}
