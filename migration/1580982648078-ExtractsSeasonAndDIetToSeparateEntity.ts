import {MigrationInterface, QueryRunner} from "typeorm";

export class ExtractsSeasonAndDIetToSeparateEntity1580982648078 implements MigrationInterface {
    name = 'ExtractsSeasonAndDIetToSeparateEntity1580982648078'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `season` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `diet` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `ingredient` DROP COLUMN `diet`", undefined);
        await queryRunner.query("ALTER TABLE `ingredient` DROP COLUMN `season`", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ingredient` ADD `season` varchar(64) NOT NULL DEFAULT 'all'", undefined);
        await queryRunner.query("ALTER TABLE `ingredient` ADD `diet` varchar(64) NOT NULL DEFAULT 'vegan'", undefined);
        await queryRunner.query("DROP TABLE `diet`", undefined);
        await queryRunner.query("DROP TABLE `season`", undefined);
    }

}
