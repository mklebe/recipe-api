import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertDietAndSeason1584304512123 implements MigrationInterface {
    name = 'InsertDietAndSeason1584304512123'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`INSERT INTO season VALUES (1, 'January')`)
        await queryRunner.query(`INSERT INTO season VALUES (2, 'February')`)
        await queryRunner.query(`INSERT INTO season VALUES (3, 'March')`)
        await queryRunner.query(`INSERT INTO season VALUES (4, 'April')`)
        await queryRunner.query(`INSERT INTO season VALUES (5, 'May')`)
        await queryRunner.query(`INSERT INTO season VALUES (6, 'June')`)
        await queryRunner.query(`INSERT INTO season VALUES (7, 'July')`)
        await queryRunner.query(`INSERT INTO season VALUES (8, 'August')`)
        await queryRunner.query(`INSERT INTO season VALUES (9, 'September')`)
        await queryRunner.query(`INSERT INTO season VALUES (10, 'October')`)
        await queryRunner.query(`INSERT INTO season VALUES (11, 'November')`)
        await queryRunner.query(`INSERT INTO season VALUES (12, 'December')`)

        await queryRunner.query(`INSERT INTO diet VALUES (1, 'omnivore')`)
        await queryRunner.query(`INSERT INTO diet VALUES (2, 'vegetarian')`)
        await queryRunner.query(`INSERT INTO diet VALUES (3, 'vegan')`)
        
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM season WHERE id=1;`)
        await queryRunner.query(`DELETE FROM season WHERE id=2;`)
        await queryRunner.query(`DELETE FROM season WHERE id=3;`)
        await queryRunner.query(`DELETE FROM season WHERE id=4;`)
        await queryRunner.query(`DELETE FROM season WHERE id=5;`)
        await queryRunner.query(`DELETE FROM season WHERE id=6;`)
        await queryRunner.query(`DELETE FROM season WHERE id=7;`)
        await queryRunner.query(`DELETE FROM season WHERE id=8;`)
        await queryRunner.query(`DELETE FROM season WHERE id=9;`)
        await queryRunner.query(`DELETE FROM season WHERE id=10;`)
        await queryRunner.query(`DELETE FROM season WHERE id=11;`)
        await queryRunner.query(`DELETE FROM season WHERE id=12;`)

        await queryRunner.query(`DELETE FROM diet WHERE id=1;`)
        await queryRunner.query(`DELETE FROM diet WHERE id=2;`)
        await queryRunner.query(`DELETE FROM diet WHERE id=3;`)

    }

}
