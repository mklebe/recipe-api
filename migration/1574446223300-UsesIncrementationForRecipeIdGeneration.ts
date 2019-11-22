import {MigrationInterface, QueryRunner} from "typeorm";

export class UsesIncrementationForRecipeIdGeneration1574446223300 implements MigrationInterface {
    name = 'UsesIncrementationForRecipeIdGeneration1574446223300'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` DROP FOREIGN KEY `FK_b67e81a9afa83f2ee13440175ce`", undefined);
        await queryRunner.query("ALTER TABLE `recipe` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `recipe` DROP COLUMN `id`", undefined);
        await queryRunner.query("ALTER TABLE `recipe` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` ADD PRIMARY KEY (`ingredientId`)", undefined);
        await queryRunner.query("DROP INDEX `IDX_b67e81a9afa83f2ee13440175c` ON `recipe_ingredients_ingredient`", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` DROP COLUMN `recipeId`", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` ADD `recipeId` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` ADD PRIMARY KEY (`ingredientId`, `recipeId`)", undefined);
        await queryRunner.query("CREATE INDEX `IDX_b67e81a9afa83f2ee13440175c` ON `recipe_ingredients_ingredient` (`recipeId`)", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` ADD CONSTRAINT `FK_b67e81a9afa83f2ee13440175ce` FOREIGN KEY (`recipeId`) REFERENCES `recipe`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` DROP FOREIGN KEY `FK_b67e81a9afa83f2ee13440175ce`", undefined);
        await queryRunner.query("DROP INDEX `IDX_b67e81a9afa83f2ee13440175c` ON `recipe_ingredients_ingredient`", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` ADD PRIMARY KEY (`ingredientId`)", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` DROP COLUMN `recipeId`", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` ADD `recipeId` varchar(36) NOT NULL", undefined);
        await queryRunner.query("CREATE INDEX `IDX_b67e81a9afa83f2ee13440175c` ON `recipe_ingredients_ingredient` (`recipeId`)", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` ADD PRIMARY KEY (`recipeId`, `ingredientId`)", undefined);
        await queryRunner.query("ALTER TABLE `recipe` DROP COLUMN `id`", undefined);
        await queryRunner.query("ALTER TABLE `recipe` ADD `id` varchar(36) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `recipe` ADD PRIMARY KEY (`id`)", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` ADD CONSTRAINT `FK_b67e81a9afa83f2ee13440175ce` FOREIGN KEY (`recipeId`) REFERENCES `recipe`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

}
