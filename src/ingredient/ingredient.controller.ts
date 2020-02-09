import { Controller, Post, Body, Get, Patch, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from '../entities/ingredient.entity';
import { IngredientQuery } from '../dtos'
import { SearchService } from '../search/search.service';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('ingredient')
@Controller('ingredient')
export class IngredientController {
    constructor(
        private readonly ingredientService: IngredientService,
        private readonly searchService: SearchService,
    ) {}

    @Post()
    @ApiOkResponse({type: Ingredient})
    async create(@Body() ingredientDto: Ingredient ) {
        return await this.ingredientService.create( ingredientDto )
            .then(( ingredient ) => {
                this.searchService.indexIngredient( ingredient )
            })
            .catch(e => {
                throw new HttpException('Could not create ingredient', HttpStatus.BAD_REQUEST)
            })
    }

    @Patch()
    @ApiOkResponse({type: Ingredient})
    async updateHits(@Body() updateIngredientDto: Ingredient ) {
        this.ingredientService.incrementHit( updateIngredientDto )
    }

    @Get('search')
    @ApiOkResponse({type: Ingredient, isArray: true})
    @ApiOperation({operationId: 'findIngredient'})
    async findByTerm( @Query('term') term: string ) {
        return await this.searchService.findIngredients( term )
            .then(( ingredientIds ) => {
                return this.ingredientService.findByIds( ingredientIds )
            })
    }

    @Get()
    @ApiOkResponse({type: Ingredient, isArray: true})
    @ApiOperation({operationId: 'findAll'})
    async findAll(@Query('query') limit: number ) {
        return this.ingredientService
            .findAll( limit )
    }

    // @Get('searchsuggest')
    // @ApiOkResponse({type: Ingredient, isArray: true})
    // @ApiOperation({
    //     operationId: 'searchSuggestion',
    // })
    // @ApiQuery({
    //     name: 'term',
    //     required: true,
    //     type: 'string'
    // })
    // async getAllFromElasticsearch(@Query('term') term: string) {
    //     return await this.searchService
    //         .findIngredients( term )
    //         .then( suggestions => {
    //             if( suggestions.length === 0 ) {
    //                 return []
    //             }

    //             return this.ingredientService.findByNames( suggestions )
    //         })
    // }

    @Get(':id')
    @ApiOkResponse({type: Ingredient})
    async getById( @Param('id') id: string ) {
        return await this.ingredientService.findById( id )
            .catch(e => {
                throw new HttpException('Ingredient not found', HttpStatus.NOT_FOUND)
            })
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
