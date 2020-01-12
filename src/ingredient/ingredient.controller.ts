import { Controller, Post, Body, Get, Patch, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from '../entities/ingredient.entity';
import { IngredientQuery } from '../dtos'
import { SearchService } from 'src/search/search.service';

@Controller('ingredient')
export class IngredientController {
    constructor(
        private readonly ingredientService: IngredientService,
        private readonly searchService: SearchService,
    ) {}

    @Post()
    async create(@Body() ingredientDto: Ingredient ) {
        return await this.ingredientService.create( ingredientDto )
            .then(( ingredient ) => {
                this.searchService.indexIngredient( ingredient )
            })
            .catch(e => {
                throw new HttpException('Could not create ingredient', HttpStatus.BAD_REQUEST)
            })
    }

    @Get(':id')
    async getById( @Param('id') id: string ) {
        return await this.ingredientService.findById( id )
            .catch(e => {
                throw new HttpException('Ingredient not found', HttpStatus.NOT_FOUND)
            })
    }

    @Patch()
    async updateHits(@Body() updateIngredientDto: Ingredient ) {
        this.ingredientService.incrementHit( updateIngredientDto )
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
