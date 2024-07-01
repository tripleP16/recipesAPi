import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddCookingTimeDto } from './dtos/add-cooking-time.dto';
import { CreateReceipeDto } from './dtos/create-receipe.dto';
import { Recipe, RecipeDocument } from './schemas/recipes.schemas';

@Injectable()
export class RecipesService {

  constructor(
    @InjectModel(Recipe.name)
    private readonly recipesModule: Model<RecipeDocument>,
  ) { }

  async getAll(): Promise<any> {
    return this.recipesModule.find().exec();
  }

  async createRecipe(payload: CreateReceipeDto) {
    try {
      const recipe = new this.recipesModule(payload);
      await recipe.save();
      return recipe;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addCookingTime(dto: AddCookingTimeDto) {
    try {
      const result = await this.recipesModule.updateOne(
        { _id: dto.recipeId },
        { $set: { cookingTime: dto.cookingTime } },
      ).exec();

      if (result.matchedCount === 0) {
        throw new NotFoundException(`Recipe with ID ${dto.recipeId} not found`);
      }

      return result;
    } catch (error) {

      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to update recipe cooking time');
      }
    }
  }
}
