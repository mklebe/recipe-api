import {Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Recipe } from "./recipe.entity";

@Entity()
export class Ingredient {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'varchar', length: '256'})
    name: string

    @Column({type: 'varchar', length: '4096'})
    description: string

    @ManyToMany(type => Recipe, recipe => recipe.ingredients)
    usedIn: Recipe[]
}
