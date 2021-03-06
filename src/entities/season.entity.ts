import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Ingredient } from "./ingredient.entity";

@Entity()
export class Season {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: '100'})
    @ApiProperty()
    name: string

    @ManyToMany( type => Ingredient, ingredient => ingredient.seasons )
    foods: Ingredient[]
}