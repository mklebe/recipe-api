import {MigrationInterface, QueryRunner} from "typeorm";

export class AddsSlugToIngredientAndRecipeAndExposesId1581248998604 implements MigrationInterface {
    name = 'AddsSlugToIngredientAndRecipeAndExposesId1581248998604'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `recipe` CHANGE `worksteps` `slug` varchar(1000) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ingredient` ADD `slug` varchar(256) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `recipe` DROP COLUMN `slug`", undefined);
        await queryRunner.query("ALTER TABLE `recipe` ADD `slug` varchar(100) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `recipe` DROP COLUMN `slug`", undefined);
        await queryRunner.query("ALTER TABLE `recipe` ADD `slug` varchar(1000) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ingredient` DROP COLUMN `slug`", undefined);
        await queryRunner.query("ALTER TABLE `recipe` CHANGE `slug` `worksteps` varchar(1000) NOT NULL", undefined);
    }

}
