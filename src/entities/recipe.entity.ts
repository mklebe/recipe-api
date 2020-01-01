
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { Ingredient } from "./ingredient.entity";
import { ApiProperty } from "@nestjs/swagger";
@Entity()
export class Recipe {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length: '100'})
    @ApiProperty()
    name: string

    @Column({length: '512'})
    @ApiProperty()
    image: string

    @ManyToMany( type => Ingredient, ingredient => ingredient.usedIn, {
        cascade: true,
        eager: true
    } )
    @JoinTable()
    @ApiProperty()
    ingredients: Ingredient[]

    @Column({length: '1000'})
    @ApiProperty()
    worksteps: string
}