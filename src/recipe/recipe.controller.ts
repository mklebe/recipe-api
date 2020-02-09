import { Controller, Get, Post, Delete, Param, Body, Put, Patch } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from '../entities/recipe.entity';
import { ApiTags, ApiHeader, ApiResponseProperty, ApiOkResponse, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('recipe')
@Controller('recipe')
export class RecipeController {
    constructor(
        private readonly recipeService: RecipeService
    ){}

    @Post()
    @ApiOkResponse({type: Recipe})
    async create(@Body() createRecipeDto: Recipe) {
        this.recipeService.create( createRecipeDto )
    }

    @Get()
    @ApiOkResponse({type: Recipe, isArray: true})
    async findAll(): Promise<Recipe[]> {
        return this.recipeService.findAll()
    }

    @Patch()
    @ApiOkResponse({type: Recipe})
    @ApiOperation({operationId: 'incrementHits'})
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
        return `This action updates a #${id} recipe`;
    }

    @Delete(':id')
    remove(@Param() params): string {
        return `This deletes recipe with id ${params.id}`
    }
}
