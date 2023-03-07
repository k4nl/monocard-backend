import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Table({
  tableName: 'pokemarket',
  timestamps: true,
})
export class Pokemarket extends Model<Pokemarket> {
  @PrimaryKey
  @Column({ autoIncrement: true, unique: true, allowNull: false })
  id: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  user_id: number;

  @ForeignKey(() => Pokemon)
  @Column({ allowNull: false })
  pokemon_id: number;

  @Column({ allowNull: false })
  price: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Pokemon)
  pokemon: Pokemon;
}
