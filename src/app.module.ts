import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [DatabaseModule, UserModule, PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
