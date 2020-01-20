import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { Ingredient } from '../entities/ingredient.entity'

const INGREDIENT_SEARCH_INDEX = 'ingredient-search-index'
const INGREDIENT_AUTOCOMPLETE_INDEX = 'ingredient-autocomplete-index'

@Injectable()
export class SearchService {
    constructor(
        private readonly elasticsearchService: ElasticsearchService
    ) {
        
    }

    setUpAutocomplete(): Promise<any> {
        return this.elasticsearchService.indices.create({
            index: INGREDIENT_SEARCH_INDEX,
            body: {
                "settings": {
                  "analysis": {
                    "filter": {
                      "autocomplete_filter": {
                        "type": "edge_ngram",
                        "min_gram": 1,
                        "max_gram": 20
                      }
                    },
                    "analyzer": {
                      "autocomplete": { 
                        "type": "custom",
                        "tokenizer": "standard",
                        "filter": [
                          "lowercase",
                          "autocomplete_filter"
                        ]
                      }
                    }
                  }
                },
                "mappings": {
                  "properties": {
                    "text": {
                      "type": "text",
                      "analyzer": "autocomplete", 
                      "search_analyzer": "standard" 
                    }
                  }
                }
              }
        })
        .then(() => {
            console.log(`Created index: ${INGREDIENT_SEARCH_INDEX}`)
        })
    }

    bulkIndex( ingredients: Ingredient[] ): Promise<any> {
        console.log( ingredients )
        return this.elasticsearchService.bulk({
            body: ingredients,
            index: INGREDIENT_SEARCH_INDEX,
        })
    }

    dropIndex(): Promise<any> {
        return this.elasticsearchService.indices.delete({index: '_all'})
    }

    indexIngredient( ingredient: Ingredient ) {
        this.elasticsearchService.index({
            index: INGREDIENT_SEARCH_INDEX,
            body: ingredient,
        })
    }

    async findIngredients( name: string ): Promise<string[]> {
        return this.elasticsearchService.search( {
            index: INGREDIENT_SEARCH_INDEX,
            q: name
        })
        .then(( response ) => {
            return response.body.hits.hits.map(( item ) => {
                return item._source.id
            })            
        })
        .catch((error) => {
            return []
        })
    }    
}
