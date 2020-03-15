import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { RecipeModule } from './recipe/recipe.module'
import { IngredientModule } from './ingredient/ingredient.module'
import { ImageController } from './image/image.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RecipeModule,
    IngredientModule,
  ],
  controllers: [
    ImageController
  ],
})

export class AppModule {
  constructor( private readonly connection: Connection) {}
}
