import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { Ingredient } from '../entities/ingredient.entity'

import { RequestParams } from '@elastic/elasticsearch'

const INGREDIENT_INDEX = 'ingredient-index'

interface SearchBody {
    query: {
        match: { name: string }
    }
}

@Injectable()
export class SearchService {
    constructor(
        private readonly elasticsearchService: ElasticsearchService
    ) {

    }

    indexIngredient( ingredient: Ingredient ) {
        this.elasticsearchService.index({
            index: INGREDIENT_INDEX,
            body: ingredient
        })
    }

    async findIngredients( name: string ): Promise<string[]> {
        return this.elasticsearchService.search( {
            index: INGREDIENT_INDEX,
            q: name
        })
        .then(( response ) => {
            return response.body.hits.hits.map(( item ) => {
                return item._id
            })            
        })
        .catch((error) => {
            return []
        })
    }    
}