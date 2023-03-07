import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { PokemarketModule } from './pokemarket/pokemarket.module';
import { PlayerbankModule } from './playerbank/playerbank.module';
import { TypetransactionsModule } from './typetransactions/typetransactions.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    PokemonModule,
    AuthModule,
    PokemarketModule,
    PlayerbankModule,
    TypetransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
