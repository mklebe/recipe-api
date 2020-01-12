import {MigrationInterface, QueryRunner} from "typeorm";

export class AddHitsForRecipeAndIngredient1578785476336 implements MigrationInterface {
    name = 'AddHitsForRecipeAndIngredient1578785476336'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `recipe` ADD `hits` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `ingredient` ADD `hits` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `ingredient` CHANGE `description` `description` varchar(4096) NOT NULL DEFAULT 'none'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ingredient` CHANGE `description` `description` varchar(4096) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ingredient` DROP COLUMN `hits`", undefined);
        await queryRunner.query("ALTER TABLE `recipe` DROP COLUMN `hits`", undefined);
    }

}
