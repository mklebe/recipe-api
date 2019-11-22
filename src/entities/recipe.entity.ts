
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
@Entity()
export class Recipe {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: '100'})
    name: string

    @Column({length: '512'})
    image: string

    @Column({length: '1000'})
    ingredients: string

    @Column({length: '1000'})
    worksteps: string
}