import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { RecipeModule } from './recipe/recipe.module';
import { IngredientModule } from './ingredient/ingredient.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RecipeModule,
    IngredientModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
  ],
})

export class AppModule {
  constructor( private readonly connection: Connection) {}
}
