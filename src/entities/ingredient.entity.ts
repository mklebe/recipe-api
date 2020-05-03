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

    @ApiProperty()
    @Column({type: "varchar", length: 256, default: ''})
    image: string

    // @ApiProperty()
    // @Column({type: 'number', default: ''})
    // energy: number

    // @ApiProperty()
    // @Column({type: 'number', default: ''})
    // fat: number

    // @ApiProperty()
    // @Column({type: 'number', default: ''})
    // saturates: number

    // @ApiProperty()
    // @Column({type: 'number', default: ''})
    // monounsturates: number

    // @ApiProperty()
    // @Column({type: 'number', default: ''})
    // polyunstaurates: number

    // @ApiProperty()
    // @Column({type: 'number', default: ''})
    // carbohydrates: number

    // @ApiProperty()
    // @Column({type: 'number', default: ''})
    // starch: number

    // @ApiProperty()
    // @Column({type: 'number', default: ''})
    // fibre: number

    // @ApiProperty()
    // @Column({type: 'number', default: ''})
    // protein: number

    // @ApiProperty()
    // @Column({type: 'number', default: ''})
    // salt: number

    // @ApiProperty()
    // @Column({type: 'number', default: ''})
    // vitaminC: number

    @ApiProperty({isArray: true, type: Diet})
    @ManyToMany(type => Diet, diet => diet.foods, {
        cascade: ['insert', 'update'],
        eager: true
    })
    @JoinTable()
    diets: Diet[]

    @ApiProperty({isArray: true, type: Season, })
    @ManyToMany( type => Season, season => season.foods, {
        cascade: ['insert', 'update'],
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
