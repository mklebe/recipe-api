import { Controller, Get, Post, Delete, Param, Body, Put, Patch } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from '../entities/recipe.entity';

@Controller('recipe')
export class RecipeController {
    constructor(
        private readonly recipeService: RecipeService
    ){}

    @Post()
    async create(@Body() createRecipeDto: Recipe) {
        this.recipeService.create( createRecipeDto )
    }

    @Get()
    async findAll() {
        return this.recipeService.findAll()
    }

    @Patch()
    async updateHits(@Body() updateRecipeDto: Recipe ) {
        this.recipeService.incrementHit( updateRecipeDto )
    }

    @Get(':id')
    async findOne(@Param() params) {
        console.log( params )
        return this.recipeService.findById( params.id )
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateRecipeDto: {}) {
        return `This action updates a #${id} recipe`;
    }

    @Delete(':id')
    remove(@Param() params): string {
        return `This deletes recipe with id ${params.id}`
    }
}
