import { Controller, Post, Body, Get, Patch, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from '../entities/ingredient.entity';
import { IngredientQuery } from '../dtos'
import { SearchService } from '../search/search.service';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

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

    @Get('search/:term')
    @ApiOkResponse({type: Ingredient, isArray: true})
    async findByTerm( @Param('term') term: string ) {
        return await this.searchService.findIngredients( term )
            .then(( ingredientIds ) => {
                return this.ingredientService.findByIds( ingredientIds )
            })
    }

    @Get()
    @ApiOkResponse({type: Ingredient, isArray: true})
    async findAll(@Query() query: IngredientQuery ) {
        console.log('Find All')
        return this.ingredientService
            .findAll( new ValidatedIngredientQuery(query) )
    }

    @Get('searchsuggest')
    @ApiOkResponse({type: Ingredient, isArray: true})
    @ApiOperation({
        operationId: 'searchSuggestion',
        parameters: [{
            in: 'query',
            name: 'term',
        }],
    })
    async getAllFromElasticsearch(@Query() term: string) {
        return this.searchService
            .searchSuggest( term )
            .then( suggestions => {
                if( suggestions.length === 0 ) {
                    return []
                }

                return this.ingredientService.findByNames( suggestions )
            })
    }

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
