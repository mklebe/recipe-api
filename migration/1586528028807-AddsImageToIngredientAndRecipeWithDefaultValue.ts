import {MigrationInterface, QueryRunner} from "typeorm";

export class AddsImageToIngredientAndRecipeWithDefaultValue1586528028807 implements MigrationInterface {
    name = 'AddsImageToIngredientAndRecipeWithDefaultValue1586528028807'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "image" character varying(256) NOT NULL DEFAULT ''`, undefined);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "image"`, undefined);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "image" character varying(256) NOT NULL DEFAULT ''`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "image"`, undefined);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "image" character varying(512) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "image"`, undefined);
    }

}
