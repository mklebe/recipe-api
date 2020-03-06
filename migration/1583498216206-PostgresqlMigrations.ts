import {MigrationInterface, QueryRunner} from "typeorm";

export class PostgresqlMigrations1583498216206 implements MigrationInterface {
    name = 'PostgresqlMigrations1583498216206'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "slug" character varying(100) NOT NULL, "image" character varying(512) NOT NULL, "hits" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "season" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_8ac0d081dbdb7ab02d166bcda9f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "slug" character varying(256) NOT NULL, "description" character varying(4096) NOT NULL DEFAULT 'none', "hits" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "diet" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_f9d0f2b67d1c9bcaa6736f4cebd" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "recipe_ingredients_ingredient" ("recipeId" integer NOT NULL, "ingredientId" integer NOT NULL, CONSTRAINT "PK_6e193bb10a2cd8a65929edf7d07" PRIMARY KEY ("recipeId", "ingredientId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b67e81a9afa83f2ee13440175c" ON "recipe_ingredients_ingredient" ("recipeId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d2bbcf7bab477bfdcec65465c0" ON "recipe_ingredients_ingredient" ("ingredientId") `, undefined);
        await queryRunner.query(`CREATE TABLE "ingredient_diets_diet" ("ingredientId" integer NOT NULL, "dietId" integer NOT NULL, CONSTRAINT "PK_2dcc8376b10a124ddc58d180648" PRIMARY KEY ("ingredientId", "dietId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_64c720af8c8e8e4ba16233d84b" ON "ingredient_diets_diet" ("ingredientId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ef769ad3ebe9ae31ff082e463c" ON "ingredient_diets_diet" ("dietId") `, undefined);
        await queryRunner.query(`CREATE TABLE "ingredient_seasons_season" ("ingredientId" integer NOT NULL, "seasonId" integer NOT NULL, CONSTRAINT "PK_535f90e1518a63bd3148c0cf469" PRIMARY KEY ("ingredientId", "seasonId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_4f43be5a6e35d65e237741fc94" ON "ingredient_seasons_season" ("ingredientId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_de21742b87cd2ea3752e1d94d4" ON "ingredient_seasons_season" ("seasonId") `, undefined);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" ADD CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" ADD CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredient_diets_diet" ADD CONSTRAINT "FK_64c720af8c8e8e4ba16233d84b6" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredient_diets_diet" ADD CONSTRAINT "FK_ef769ad3ebe9ae31ff082e463c8" FOREIGN KEY ("dietId") REFERENCES "diet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredient_seasons_season" ADD CONSTRAINT "FK_4f43be5a6e35d65e237741fc943" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredient_seasons_season" ADD CONSTRAINT "FK_de21742b87cd2ea3752e1d94d44" FOREIGN KEY ("seasonId") REFERENCES "season"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "ingredient_seasons_season" DROP CONSTRAINT "FK_de21742b87cd2ea3752e1d94d44"`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredient_seasons_season" DROP CONSTRAINT "FK_4f43be5a6e35d65e237741fc943"`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredient_diets_diet" DROP CONSTRAINT "FK_ef769ad3ebe9ae31ff082e463c8"`, undefined);
        await queryRunner.query(`ALTER TABLE "ingredient_diets_diet" DROP CONSTRAINT "FK_64c720af8c8e8e4ba16233d84b6"`, undefined);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" DROP CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c"`, undefined);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" DROP CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_de21742b87cd2ea3752e1d94d4"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_4f43be5a6e35d65e237741fc94"`, undefined);
        await queryRunner.query(`DROP TABLE "ingredient_seasons_season"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_ef769ad3ebe9ae31ff082e463c"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_64c720af8c8e8e4ba16233d84b"`, undefined);
        await queryRunner.query(`DROP TABLE "ingredient_diets_diet"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d2bbcf7bab477bfdcec65465c0"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b67e81a9afa83f2ee13440175c"`, undefined);
        await queryRunner.query(`DROP TABLE "recipe_ingredients_ingredient"`, undefined);
        await queryRunner.query(`DROP TABLE "diet"`, undefined);
        await queryRunner.query(`DROP TABLE "ingredient"`, undefined);
        await queryRunner.query(`DROP TABLE "season"`, undefined);
        await queryRunner.query(`DROP TABLE "recipe"`, undefined);
    }

}
