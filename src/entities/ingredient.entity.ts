import {Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Recipe } from "./recipe.entity";
import { ApiProperty, ApiHideProperty } from "@nestjs/swagger";
import { Diet } from "./diet.entity";
import { Season } from "./season.entity";

@Entity()
export class Ingredient {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    @ApiProperty()
    id: number

    @ApiProperty()
    @Column({type: 'varchar', length: '256'})
    name: string

    @ApiProperty()
    @Column({type: 'varchar', length: '256'})
    slug: string

    @ApiProperty()
    @Column({type: 'varchar', length: '4096', default: 'none'})
    description: string

    @ApiProperty({isArray: true, type: Diet})
    @ManyToMany(type => Diet, diet => diet.foods, {
        cascade: true,
        eager: true
    })
    @JoinTable()
    diets: Diet[]

    @ApiProperty({isArray: true, type: Season, })
    @ManyToMany( type => Season, season => season.foods, {
        cascade: true,
        eager: true
    })
    @JoinTable()
    seasons: Season[]

    @ApiProperty()
    @Column({type: 'integer', default: 0})
    hits: number

    @ApiHideProperty()
    @ManyToMany(type => Recipe, recipe => recipe.ingredients)
    usedIn: Recipe[]
}
