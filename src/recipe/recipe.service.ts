import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from '../entities/recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private readonly recipeRepository: Repository<Recipe>
    ){}

    async findAll(): Promise<Recipe[]> {
        return await this.recipeRepository.find()
    }

    async findById(id: string): Promise<Recipe> {
        return await this.recipeRepository.findOne( id )
    }

    async create( recipe: Recipe ) {
        this.recipeRepository.save(recipe)
    }

    async delete( recipe: Recipe ) {
        this.recipeRepository.remove( recipe )
    }

    incrementHit( recipe: Recipe ): void {
        this.recipeRepository
            .increment( {id: recipe.id}, 'hits', 1 )
    }
}
