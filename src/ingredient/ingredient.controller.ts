import { Controller, Post, Body, Get } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from 'src/entities/ingredient.entity';

@Controller('ingredient')
export class IngredientController {
    constructor(
        private readonly ingredientService: IngredientService
    ) {}

    @Post()
    async create(@Body() ingredientDto: Ingredient ) {
        this.ingredientService.create( ingredientDto )
    }

    @Get()
    async findAll() {
        return this.ingredientService.findAll()
    }
}
