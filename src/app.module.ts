import { Module, HttpModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { RecipeModule } from './recipe/recipe.module'
import { IngredientModule } from './ingredient/ingredient.module'
import { ImageController } from './image/image.controller'
import { FatSecretService } from './shared/fat-secret/fat-secret.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RecipeModule,
    IngredientModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    })
  ],
  controllers: [
    ImageController
  ],
  providers: [FatSecretService],
})

export class AppModule {
  constructor( private readonly connection: Connection) {}
}
