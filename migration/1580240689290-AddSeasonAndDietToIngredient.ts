import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSeasonAndDietToIngredient1580240689290 implements MigrationInterface {
    name = 'AddSeasonAndDietToIngredient1580240689290'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ingredient` ADD `diet` varchar(64) NOT NULL DEFAULT 'vegan'", undefined);
        await queryRunner.query("ALTER TABLE `ingredient` ADD `season` varchar(64) NOT NULL DEFAULT 'all'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ingredient` DROP COLUMN `season`", undefined);
        await queryRunner.query("ALTER TABLE `ingredient` DROP COLUMN `diet`", undefined);
    }

}
