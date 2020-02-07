import { Controller, Get, Post, Delete, Param, Body, Put, Patch } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from '../entities/recipe.entity';
import { ApiTags, ApiHeader, ApiResponseProperty, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('recipe')
@ApiHeader({
    name: 'Recipe',
    description: 'The REST endpoint to add and recive recipes'
})
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
    async updateHits(@Body() updateRecipeDto: Recipe ) {
        this.recipeService.incrementHit( updateRecipeDto )
    }

    @Get(':id')
    @ApiOkResponse({type: Recipe})
    async findOne(@Param() params) {
        console.log( params )
        return this.recipeService.findById( params.id )
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
