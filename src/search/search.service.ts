import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Ingredient } from '../entities/ingredient.entity';

const INGREDIENT_INDEX = 'ingredient-index'

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

    findIngredient( name: string ) {
        this.elasticsearchService.search({
            index: INGREDIENT_INDEX,
            body: {
                name: name
            }
        })
        .catch((response) => {
            console.log( response )
        })
    }


}
