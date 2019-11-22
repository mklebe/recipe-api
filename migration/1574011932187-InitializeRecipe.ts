import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class InitializeRecipe1574011932187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'recipe',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isGenerated: true,
                    isPrimary: true,
                    length: '36'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '100'
                },
                {
                    name: 'image',
                    type: 'varchar',
                    length: '512'
                },
                {
                    name: 'ingredients',
                    type: 'varchar',
                    length: '1000'
                },
                {
                    name: 'worksteps',
                    type: 'varchar',
                    length: '1000'
                },
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('recipe')
    }

}
