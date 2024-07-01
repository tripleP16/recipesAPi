import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecipeDocument = HydratedDocument<Recipe>;

export enum RecipeDifficultyEnum {
  easy = 'Easy',
  medium = 'Medium',
  hard = 'Master Chef',
}

@Schema({ collection: 'recipes', timestamps: true })
export class Recipe {
  @Prop({ type: String, unique: true, index: true })
  name: string;

  @Prop({ type: Array, index: true })
  ingredients: any;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String, enum: RecipeDifficultyEnum })
  difficulty: any;

  @Prop({ type: Number, index: true })
  cookingTime: number;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
