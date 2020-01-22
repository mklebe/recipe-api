import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { Ingredient } from '../entities/ingredient.entity'
import { from } from 'rxjs'

const INGREDIENT_SEARCH_INDEX = 'ingredient-search-index'
const INGREDIENT_AUTOCOMPLETE_INDEX = 'ingredient-autocomplete-index'

@Injectable()
export class SearchService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {

  }


  searchSuggest( searchTerm: string ): Promise<string[]> {
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
