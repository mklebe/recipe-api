import {Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Recipe } from "./recipe.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Diet } from "./diet.entity";
import { Season } from "./season.entity";

@Entity()
export class Ingredient {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number

    @ApiProperty()
    @Column({type: 'varchar', length: '256'})
    name: string

    @ApiProperty()
    @Column({type: 'varchar', length: '4096', default: 'none'})
    description: string

    @ApiProperty()
    @ManyToMany(type => Diet, diet => diet.foods, {
        cascade: true,
        eager: true
    })
    @JoinTable()
    diets: Diet[]

    @ApiProperty()
    @ManyToMany( type => Season, season => season.foods, {
        cascade: true,
        eager: true
    })
    @JoinTable()
    seasons: Season[]

    @ApiProperty()
    @Column({type: 'integer', default: 0})
    hits: number

    @ApiProperty()
    @ManyToMany(type => Recipe, recipe => recipe.ingredients)
    usedIn: Recipe[]
}
