import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { Ingredient } from '../entities/ingredient.entity'

const INGREDIENT_SEARCH_INDEX = 'ingredient-search-index'
const INGREDIENT_AUTOCOMPLETE_INDEX = 'ingredient-autocomplete-index'

@Injectable()
export class SearchService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  initialize() {
    const ingredient = new Ingredient()
    return this.elasticsearchService.indices.exists({
      index: INGREDIENT_SEARCH_INDEX
    })
    .then( (result) => {
      console.log( `Index ${INGREDIENT_SEARCH_INDEX} is up and running`)
      console.log( result )
    })
    .catch( async () => {
      console.log(`Index ${INGREDIENT_SEARCH_INDEX} does not exist, initialize it now ...`)
      await this.elasticsearchService.create({
        id: '0',
        index: INGREDIENT_SEARCH_INDEX,
        body: {},
      })
      .catch( _ => console.log('### FATAL: Could not create index. Abort! ###') )

      console.log(`Index ${INGREDIENT_SEARCH_INDEX} is created. Happy Search!`)
    })
  }


  searchSuggest( searchTerm: string ): Promise<string[]> {
    console.log( searchTerm, 'service' )
    return this.elasticsearchService.search({
      index: INGREDIENT_SEARCH_INDEX,
      body: {
        suggest: {
          'text': searchTerm,
          'my_suggestion_1': {
            'term': {
              'field': 'name'
            }
          },
        }
      }
    })
    .then( response => {
      console.log( response.body.suggest['my_suggestion_1'][0] )
      return response.body.suggest['my_suggestion_1'][0].options.map((option) => {
        return option.text
      })
    })
    .catch(error => {
      console.log( error.meta.body.error )
    })
  }

  bulkIndex(ingredients: Ingredient[]): Promise<any> {
    console.log(`Bulk indexing of ${ingredients.length / 2} ingredients`)
    return this.elasticsearchService.bulk({
      body: ingredients,
      index: INGREDIENT_SEARCH_INDEX,
    })
  }

  dropIndex(): Promise<any> {
    return this.elasticsearchService.indices.delete({ index: '_all' })
      .catch(() => {
        console.log('### Could not drop indicies... continue... ###')
      })
  }

  indexIngredient(ingredient: Ingredient) {
    this.elasticsearchService.index({
      index: INGREDIENT_SEARCH_INDEX,
      body: ingredient,
    })
  }

  async findIngredients(name: string): Promise<string[]> {
    return this.elasticsearchService.search({
      index: INGREDIENT_SEARCH_INDEX,
      q: name
    })
      .then((response) => {
        return response.body.hits.hits.map((item) => {
          return item._source.id
        })
      })
      .catch((error) => {
        return []
      })
  }
}
