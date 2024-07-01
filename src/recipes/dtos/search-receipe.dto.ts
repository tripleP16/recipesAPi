import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

export class SearchReceipeDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example: 'Pizza',
        description: 'Recipe name',
        type: String,
    })
    name: string;

    @IsOptional()
    @IsInt()
    @ApiProperty({
        required: false,
        example: '8',
        description: 'Time in minutes',
        type: Number,
    })
    cookingTime: number;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @ApiProperty({
        required: false,
        description: 'Recipe ingredients',
        type: Array,
        example: ['tomato', 'cheese'],
    })
    ingredients: string[];
}