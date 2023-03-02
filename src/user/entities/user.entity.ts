import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({ autoIncrement: true, unique: true, allowNull: false })
  id: number;

  @Column({ allowNull: false, unique: true })
  name: string;

  @Column({ allowNull: false })
  password: string;
}
