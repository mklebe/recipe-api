import { Module, OnModuleInit, OnModuleDestroy, OnApplicationShutdown } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from '../entities/ingredient.entity';
import {ElasticsearchModule} from '@nestjs/elasticsearch'
import { SearchService } from '../search/search.service';
import { IngredientQuery } from '../dtos'

const ELASTIC_SEARCH_HOST = 'http://localhost:9200'

@Module({
  imports: [
    TypeOrmModule.forFeature([Ingredient]),
    ElasticsearchModule.register({
      node: ELASTIC_SEARCH_HOST
    })
  ],
  controllers: [IngredientController],
  providers: [
    IngredientService,
    SearchService
  ]
})
export class IngredientModule implements OnModuleInit, OnApplicationShutdown {
  onModuleInit() {
    console.log('Ingredient initialized')
    this.ingredientService.findAll(
      new FindAllIngredientsQuery()
      ).then(( ingredients ) => {
        const bulk = []
        ingredients.forEach(( ingredient ) => {
          bulk.push({
            index: {
              _index: 'ingredient-index',
              _type: 'ingredients'
            }
          })
          bulk.push( ingredient )
        })

        this.searchService.bulkIndex(bulk)
    })
  }

  onApplicationShutdown() {
    console.log( 'Module destroy' )
    this.searchService.dropIndex()
  }

  constructor(
    private readonly searchService: SearchService,
    private readonly ingredientService: IngredientService
  ) {

  }
}

class FindAllIngredientsQuery implements IngredientQuery {
  public matcher = ''
  public limit = 100
}