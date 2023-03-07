import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { Typetransaction } from 'src/typetransactions/entities/typetransaction.entity';

@Table({
  tableName: 'playerbank',
  timestamps: true,
})
export class Playerbank extends Model<Playerbank> {
  @PrimaryKey
  @Column({ autoIncrement: true, unique: true, allowNull: false })
  id: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  user_id: number;

  @ForeignKey(() => Typetransaction)
  @Column({ allowNull: false })
  transaction: number;

  @Column({ allowNull: false })
  amount: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Typetransaction)
  typetransaction: Typetransaction;
}
