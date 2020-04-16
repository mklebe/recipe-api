import { Controller, Get, Post, Delete, Param, Body, Put, Patch, HttpException, HttpStatus } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from '../entities/recipe.entity';
import { ApiTags, ApiHeader, ApiResponseProperty, ApiOkResponse, ApiOperation, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';

const slugify = require('slugify')

@ApiTags('recipe')
@Controller('recipe')
export class RecipeController {
    constructor(
        private readonly recipeService: RecipeService
    ){}

    @Post()
    @ApiOkResponse({type: Recipe})
    @ApiOperation({operationId: 'addRecipe'})
    @ApiBody({
        type: Recipe,
        required: true,
    })
    async create(@Body() createRecipeDto: Recipe) {
        createRecipeDto.slug = slugify(createRecipeDto.name)
        this.recipeService.create( createRecipeDto )
    }

    @Get()
    @ApiOkResponse({type: Recipe, isArray: true})
    async findAll(): Promise<Recipe[]> {
        return this.recipeService.findAll()
    }

    @Patch()
    @ApiOkResponse({type: Recipe})
    @ApiOperation({operationId: 'incrementRecipeHits'})
    async updateHits(@Body() updateRecipeDto: Recipe ) {
        await this.recipeService.incrementHit( updateRecipeDto )
        return updateRecipeDto
    }

    @Get(':id')
    @ApiOkResponse({type: Recipe})
    @ApiOperation({
        operationId: 'findById',
    })
    @ApiParam({
        name: 'id',
        type: 'string'
    })
    async findOne(@Param('id') id) {
        return this.recipeService.findById( id )
    }

    @Put(':id')
    @ApiOkResponse({type: Recipe})
    update(@Param('id') id: string, @Body() updateRecipeDto: Recipe) {
        return this.recipeService.update( id, updateRecipeDto )
    }

    @Delete(':id')
    remove(@Param() params): string {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
}
