export class CustomError {
  message: string[];
  statusCode: number;
  infos?: any;
  constructor(message: string[], statusCode: number, infos?: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.infos = infos;
  }
}
