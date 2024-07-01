import { Recipe, RecipeDocument } from './schemas/recipes.schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name)
    private readonly recipesModule: Model<RecipeDocument>,
  ) {}

  async getAll(): Promise<any> {
    return this.recipesModule.find().exec();
  }

  async createRecipe(payload: any): Promise<any> {
    try {
      const recipe = new this.recipesModule(payload);
      await recipe.save();
      return recipe;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
