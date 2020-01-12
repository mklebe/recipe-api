import {MigrationInterface, QueryRunner} from "typeorm";

export class DefaultValueForIngredientDescription1578785295198 implements MigrationInterface {
    name = 'DefaultValueForIngredientDescription1578785295198'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ingredient` CHANGE `description` `description` varchar(4096) NOT NULL DEFAULT 'none'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ingredient` CHANGE `description` `description` varchar(4096) NOT NULL", undefined);
    }

}
