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

    async findAll( query: IngredientQuery ): Promise<Ingredient[]> {
        return await this.ingredientRepository.find({
            where: [{
                name: Like(`%${query.matcher}%`)
            }],
            take: query.limit
        })
    }

    async findById(id: string): Promise<Ingredient> {
        return await this.ingredientRepository.findOne(id)
    }

    async create( ingredient: Ingredient ) {
        this.ingredientRepository.save( ingredient )
    }
}
