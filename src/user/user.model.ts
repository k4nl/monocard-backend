import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column
  id: number;

  @Column
  name: string;

  @Column
  password: string;
}
