import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from 'src/entities/ingredient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientService {
    constructor(
        @InjectRepository(Ingredient)
        private readonly ingredientService: Repository<Ingredient>
    ){}

    async findAll(): Promise<Ingredient[]> {
        return await this.ingredientService.find()
    }

    async create( ingredient: Ingredient ) {
        this.ingredientService.save( ingredient )
    }
}
