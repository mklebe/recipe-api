import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from '../entities/ingredient.entity';
import {ElasticsearchModule} from '@nestjs/elasticsearch'
import { SearchService } from '../search/search.service';

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
export class IngredientModule {}
