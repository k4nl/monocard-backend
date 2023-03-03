import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({
  tableName: 'type_transactions',
  timestamps: true,
})
export class Typetransaction extends Model<Typetransaction> {
  @PrimaryKey
  @Column({ autoIncrement: true, unique: true, allowNull: false })
  id: number;

  @Column({ allowNull: false, unique: true })
  name: string;
}
