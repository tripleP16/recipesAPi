import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RecipeDifficultyEnum } from "../schemas/recipes.schemas";

export class CreateReceipeDto {
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        description: 'Recipe name',
        type: String,
        example: 'Pizza',
    })
    name: string;

    @IsNotEmpty()
    @ApiProperty({
        required: true,
        description: 'Recipe description',
        type: String,
        example: 'Pizza with peperone',
    })
    description: string;

    @IsNotEmpty()
    @IsEnum(RecipeDifficultyEnum)
    @ApiProperty({
        required: true,
        description: 'Recipe difficulty',
        type: String,
        example: RecipeDifficultyEnum.easy,
    })
    difficulty: RecipeDifficultyEnum;


    @IsArray()
    @IsNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @ApiProperty({
        required: true,
        description: 'Recipe ingredients',
        type: Array,
        example: ['tomato', 'cheese'],
    })
    ingredients: string[];

    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 10,
        description: 'Cooking time in minutes',
        type: Number,
    })
    cookingTime: number;


}