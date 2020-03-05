
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { Ingredient } from "./ingredient.entity";
import { ApiProperty } from "@nestjs/swagger";
@Entity()
export class Recipe {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    @ApiProperty()
    id: number

    @Column({length: '100'})
    @ApiProperty()
    name: string

    @Column({length: '100'})
    @ApiProperty()
    slug: string

    @Column({length: '512'})
    @ApiProperty()
    image: string

    @ManyToMany( type => Ingredient, ingredient => ingredient.usedIn, {
        cascade: true,
        eager: true
    } )
    @JoinTable()
    @ApiProperty({
        type: Ingredient,
        isArray: true
    })
    ingredients: Ingredient[]

    @ApiProperty()
    @Column({type: 'integer', default: 0})
    hits: number
}