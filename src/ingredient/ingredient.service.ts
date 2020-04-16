import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../entities/ingredient.entity';
import { Repository, Like } from 'typeorm';
import { IngredientQuery } from '../dtos';

@Injectable()
export class IngredientService {
    constructor(
        @InjectRepository(Ingredient)
        private readonly ingredientRepository: Repository<Ingredient>
    ){}

    async findAll( limit: number ): Promise<Ingredient[]> {
        return await this.ingredientRepository.find({
            take: limit
        })
    }

    async findById(id: string): Promise<Ingredient> {
        return await this.ingredientRepository.findOne(id)
    }

    async update(ingredient: Ingredient): Promise<Ingredient> {
        return await this.ingredientRepository.save(ingredient)
    }

    async findByNames(names :string[]):Promise<Ingredient[]> {
        const whereClause = names.map( name => {
            return {name: Like(`%${name}%`)}
        })

        return await this.ingredientRepository.find({
            where: whereClause
        })
    }

    async findByIds(ids: string[]): Promise<Ingredient[]> {
        return await this.ingredientRepository.findByIds(ids)
    }

    async create( ingredient: Ingredient ) {
        return await this.ingredientRepository.save( ingredient )
    }

    incrementHit( recipe: Ingredient ): void {
        this.ingredientRepository
            .increment( {id: recipe.id}, 'hits', 1 )
    }
}
