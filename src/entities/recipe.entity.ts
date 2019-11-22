
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { Ingredient } from "./ingredient.entity";
@Entity()
export class Recipe {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length: '100'})
    name: string

    @Column({length: '512'})
    image: string

    @ManyToMany( type => Ingredient, ingredient => ingredient.usedIn )
    @JoinTable()
    ingredients: Ingredient[]

    @Column({length: '1000'})
    worksteps: string
}