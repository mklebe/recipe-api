import {MigrationInterface, QueryRunner} from "typeorm";

export class ExtractsSeasonAndDIetToSeparateEntityCorrectedNumerals1580982986567 implements MigrationInterface {
    name = 'ExtractsSeasonAndDIetToSeparateEntityCorrectedNumerals1580982986567'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `ingredient_diets_diet` (`ingredientId` int NOT NULL, `dietId` int NOT NULL, INDEX `IDX_64c720af8c8e8e4ba16233d84b` (`ingredientId`), INDEX `IDX_ef769ad3ebe9ae31ff082e463c` (`dietId`), PRIMARY KEY (`ingredientId`, `dietId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ingredient_seasons_season` (`ingredientId` int NOT NULL, `seasonId` int NOT NULL, INDEX `IDX_4f43be5a6e35d65e237741fc94` (`ingredientId`), INDEX `IDX_de21742b87cd2ea3752e1d94d4` (`seasonId`), PRIMARY KEY (`ingredientId`, `seasonId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_diets_diet` ADD CONSTRAINT `FK_64c720af8c8e8e4ba16233d84b6` FOREIGN KEY (`ingredientId`) REFERENCES `ingredient`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_diets_diet` ADD CONSTRAINT `FK_ef769ad3ebe9ae31ff082e463c8` FOREIGN KEY (`dietId`) REFERENCES `diet`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_seasons_season` ADD CONSTRAINT `FK_4f43be5a6e35d65e237741fc943` FOREIGN KEY (`ingredientId`) REFERENCES `ingredient`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_seasons_season` ADD CONSTRAINT `FK_de21742b87cd2ea3752e1d94d44` FOREIGN KEY (`seasonId`) REFERENCES `season`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ingredient_seasons_season` DROP FOREIGN KEY `FK_de21742b87cd2ea3752e1d94d44`", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_seasons_season` DROP FOREIGN KEY `FK_4f43be5a6e35d65e237741fc943`", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_diets_diet` DROP FOREIGN KEY `FK_ef769ad3ebe9ae31ff082e463c8`", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_diets_diet` DROP FOREIGN KEY `FK_64c720af8c8e8e4ba16233d84b6`", undefined);
        await queryRunner.query("DROP INDEX `IDX_de21742b87cd2ea3752e1d94d4` ON `ingredient_seasons_season`", undefined);
        await queryRunner.query("DROP INDEX `IDX_4f43be5a6e35d65e237741fc94` ON `ingredient_seasons_season`", undefined);
        await queryRunner.query("DROP TABLE `ingredient_seasons_season`", undefined);
        await queryRunner.query("DROP INDEX `IDX_ef769ad3ebe9ae31ff082e463c` ON `ingredient_diets_diet`", undefined);
        await queryRunner.query("DROP INDEX `IDX_64c720af8c8e8e4ba16233d84b` ON `ingredient_diets_diet`", undefined);
        await queryRunner.query("DROP TABLE `ingredient_diets_diet`", undefined);
    }

}
