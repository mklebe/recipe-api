import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from '../entities/recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
    imports: [TypeOrmModule.forFeature([Recipe])],
    providers: [RecipeService],
    controllers: [RecipeController]
})

export class RecipeModule {}
