import { CustomError } from './CustomError';
export class Pagination {
  page: number;
  total: number;
  constructor(page: number, total: number) {
    this.page = page;
    this.total = total;
  }

  validate() {
    if (!this.page) {
      this.page = 1;
    }
    if (Number(this.page) < 1) {
      throw new CustomError(['Invalid page number'], 400);
    }
    if (!this.total) {
      this.total = 10;
    }
    if (Number(this.total) < 1) {
      throw new CustomError(['Invalid total number'], 400);
    }
  }

  calculateOffset() {
    const offset = Math.round((Number(this.page) - 1) * Number(this.total));
    if (offset > Number(this.total)) return Number(this.total) - 10;
    return offset;
  }

  getPagination() {
    this.validate();
    const offset = this.calculateOffset();
    console.log('OFFSET', offset);
    return { offset, total: this.total, limit: 10, page: Number(this.page) };
  }
}
