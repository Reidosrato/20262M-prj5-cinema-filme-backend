import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.validation';
import { FilmesModule } from './filmes/filmes.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
    }),
    PrismaModule,
    FilmesModule,
  ],
})
export class AppModule {
  /** adicionar somente estas linhas do construtor  **/
  constructor() {
    console.log("Aplicação iniciada!");
    console.log("Banco:", process.env.DATABASE_URL);
    console.log("API Key:", process.env.API_KEY);
    console.log("JWT Secret:", process.env.JWT_SECRET);   
  }
  /** fim do adicionar  **/
}

