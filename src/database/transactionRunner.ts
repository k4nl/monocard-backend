import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TransactionRunner {
  constructor(private sequelize: Sequelize) {}

  async startTransaction(): Promise<any> {
    await this.sequelize.sync();
    const t = await this.sequelize.transaction();
    return t;
  }

  async commitTransaction(t: any): Promise<void> {
    await t.commit();
  }

  async rollbackTransaction(t: any): Promise<void> {
    await t.rollback();
  }
}
