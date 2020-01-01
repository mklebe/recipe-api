import {Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Recipe } from "./recipe.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Ingredient {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number

    @ApiProperty()
    @Column({type: 'varchar', length: '256'})
    name: string

    @ApiProperty()
    @Column({type: 'varchar', length: '4096'})
    description: string

    @ApiProperty()
    @ManyToMany(type => Recipe, recipe => recipe.ingredients)
    usedIn: Recipe[]
}
