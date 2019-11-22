import {Entity, PrimaryColumn, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class ingredient {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'varchar', length: '256'})
    name: string

    @Column({type: 'varchar', length: '4096'})
    description: string

}
