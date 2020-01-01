import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from 'src/entities/ingredient.entity';
import { IngredientQuery } from 'src/dtos'

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
    async findAll(@Query() query: IngredientQuery ) {
        return this.ingredientService
            .findAll( new ValidatedIngredientQuery(query) )
    }
}

class ValidatedIngredientQuery implements IngredientQuery {
    public limit: number
    public matcher: string

    constructor( inputQuery: IngredientQuery ) {
        this.limit = inputQuery.limit || 10
        this.matcher = inputQuery.matcher || ""
    }
}
