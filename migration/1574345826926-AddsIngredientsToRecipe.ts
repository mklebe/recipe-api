import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddsIngredientsToRecipe1574345826926 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'ingredient',
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
                    length: '256'
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '4096'
                },
            ],            
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
