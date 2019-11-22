import {MigrationInterface, QueryRunner} from "typeorm";

export class SetupRecipeAndIngredient1574437364768 implements MigrationInterface {
    name = 'SetupRecipeAndIngredient1574437364768'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `recipe` (`id` varchar(36) NOT NULL, `name` varchar(100) NOT NULL, `image` varchar(512) NOT NULL, `worksteps` varchar(1000) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `ingredient` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(256) NOT NULL, `description` varchar(4096) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `recipe_ingredients_ingredient` (`recipeId` varchar(36) NOT NULL, `ingredientId` int NOT NULL, INDEX `IDX_b67e81a9afa83f2ee13440175c` (`recipeId`), INDEX `IDX_d2bbcf7bab477bfdcec65465c0` (`ingredientId`), PRIMARY KEY (`recipeId`, `ingredientId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` ADD CONSTRAINT `FK_b67e81a9afa83f2ee13440175ce` FOREIGN KEY (`recipeId`) REFERENCES `recipe`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` ADD CONSTRAINT `FK_d2bbcf7bab477bfdcec65465c0c` FOREIGN KEY (`ingredientId`) REFERENCES `ingredient`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` DROP FOREIGN KEY `FK_d2bbcf7bab477bfdcec65465c0c`", undefined);
        await queryRunner.query("ALTER TABLE `recipe_ingredients_ingredient` DROP FOREIGN KEY `FK_b67e81a9afa83f2ee13440175ce`", undefined);
        await queryRunner.query("DROP INDEX `IDX_d2bbcf7bab477bfdcec65465c0` ON `recipe_ingredients_ingredient`", undefined);
        await queryRunner.query("DROP INDEX `IDX_b67e81a9afa83f2ee13440175c` ON `recipe_ingredients_ingredient`", undefined);
        await queryRunner.query("DROP TABLE `recipe_ingredients_ingredient`", undefined);
        await queryRunner.query("DROP TABLE `ingredient`", undefined);
        await queryRunner.query("DROP TABLE `recipe`", undefined);
    }

}
