import {MigrationInterface, QueryRunner} from "typeorm";

export class ExtractsSeasonAndDIetToSeparateEntityWithJoinTable1580982888937 implements MigrationInterface {
    name = 'ExtractsSeasonAndDIetToSeparateEntityWithJoinTable1580982888937'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `ingredient_diet_diet` (`ingredientId` int NOT NULL, `dietId` int NOT NULL, INDEX `IDX_61f8b9aa1dbd18adddd0eb7a75` (`ingredientId`), INDEX `IDX_526d813bf6a753087dbd205ab6` (`dietId`), PRIMARY KEY (`ingredientId`, `dietId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ingredient_season_season` (`ingredientId` int NOT NULL, `seasonId` int NOT NULL, INDEX `IDX_24ceca0a184f72786849be82ad` (`ingredientId`), INDEX `IDX_bd926504cbc02523b7abb93133` (`seasonId`), PRIMARY KEY (`ingredientId`, `seasonId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_diet_diet` ADD CONSTRAINT `FK_61f8b9aa1dbd18adddd0eb7a758` FOREIGN KEY (`ingredientId`) REFERENCES `ingredient`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_diet_diet` ADD CONSTRAINT `FK_526d813bf6a753087dbd205ab67` FOREIGN KEY (`dietId`) REFERENCES `diet`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_season_season` ADD CONSTRAINT `FK_24ceca0a184f72786849be82ad2` FOREIGN KEY (`ingredientId`) REFERENCES `ingredient`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_season_season` ADD CONSTRAINT `FK_bd926504cbc02523b7abb931337` FOREIGN KEY (`seasonId`) REFERENCES `season`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ingredient_season_season` DROP FOREIGN KEY `FK_bd926504cbc02523b7abb931337`", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_season_season` DROP FOREIGN KEY `FK_24ceca0a184f72786849be82ad2`", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_diet_diet` DROP FOREIGN KEY `FK_526d813bf6a753087dbd205ab67`", undefined);
        await queryRunner.query("ALTER TABLE `ingredient_diet_diet` DROP FOREIGN KEY `FK_61f8b9aa1dbd18adddd0eb7a758`", undefined);
        await queryRunner.query("DROP INDEX `IDX_bd926504cbc02523b7abb93133` ON `ingredient_season_season`", undefined);
        await queryRunner.query("DROP INDEX `IDX_24ceca0a184f72786849be82ad` ON `ingredient_season_season`", undefined);
        await queryRunner.query("DROP TABLE `ingredient_season_season`", undefined);
        await queryRunner.query("DROP INDEX `IDX_526d813bf6a753087dbd205ab6` ON `ingredient_diet_diet`", undefined);
        await queryRunner.query("DROP INDEX `IDX_61f8b9aa1dbd18adddd0eb7a75` ON `ingredient_diet_diet`", undefined);
        await queryRunner.query("DROP TABLE `ingredient_diet_diet`", undefined);
    }

}
