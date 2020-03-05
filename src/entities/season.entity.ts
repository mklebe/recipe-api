import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Ingredient } from "./ingredient.entity";

export enum Month {
    JANUARY = 'January',
    FEBRUARY = 'February',
    MARCH = 'March',
    APRIL = 'April',
    MAY = 'May',
    JUNE = 'June',
    JULY = 'July',
    AUGUST = 'August',
    SEPTEMBER = 'September',
    OCTOBER = 'October',
    NOVEMBER = 'November',
    DECEMBER = 'December'
}

@Entity()
export class Season {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: '100'})
    @ApiProperty({
        enum: Month
    })
    name: Month

    @ManyToMany( type => Ingredient, ingredient => ingredient.seasons )
    foods: Ingredient[]
}