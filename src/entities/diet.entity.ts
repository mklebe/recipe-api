import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Ingredient } from "./ingredient.entity";

export enum VegetarianDiets {
    VEGAN = 'Vegan',
    VEGETARIAN = 'Vegetarian',
}

@Entity()
export class Diet {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: '100'})
    @ApiProperty()
    name: VegetarianDiets

    @ManyToMany( type => Ingredient, ingredient => ingredient.diets )
    foods: Ingredient[]
}