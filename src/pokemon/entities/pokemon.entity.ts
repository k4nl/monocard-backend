import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({
  tableName: 'pokemon',
  timestamps: true,
})
export class Pokemon extends Model<Pokemon> {
  @PrimaryKey
  @Column({ autoIncrement: true, unique: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  poke_api_id: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
