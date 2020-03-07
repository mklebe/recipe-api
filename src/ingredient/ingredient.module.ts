import { Module, OnModuleInit, OnModuleDestroy, OnApplicationShutdown } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from '../entities/ingredient.entity';
import {ElasticsearchModule} from '@nestjs/elasticsearch'
import { SearchService } from '../search/search.service';
import { IngredientQuery } from '../dtos'

require('dotenv').config()

const MAXIMUM_INGREDIENTS = 100
const ELASTIC_SEARCH_HOST = process.env.SEARCHBOX_URL

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
    console.log('### Drop Old index ###')
    this.searchService.dropIndex()
      .then( _ => console.log('Old Index is dropped'))
      .then(() => {
        this.ingredientService.findAll(MAXIMUM_INGREDIENTS)
          .then(( ingredients ) => {
            const bulk = []
            ingredients.forEach(( ingredient ) => {
              bulk.push({
                index: {
                  _index: 'ingredient-search-index',
                  _type: '_doc'
                }
              })
              bulk.push( ingredient )
            })
    
            this.searchService.bulkIndex(bulk)
              .then(_ => console.log('### DB indexed ###'))
        })
      })
      .catch( (error) => {
        console.log('### Error while initializing searchengine ###')
        console.log( error )
      } )
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