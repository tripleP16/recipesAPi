import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddCookingTimeDto {
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 10,
        description: 'Cooking time in minutes',
        type: Number,
    })
    cookingTime: number;

    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: '60c7279e3e1881f28a221648',
        description: 'recipe id',
        type: String,
    })
    recipeId: string;
}