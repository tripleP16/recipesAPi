import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { AddCookingTimeDto } from './dtos/add-cooking-time.dto';
import { CreateReceipeDto } from './dtos/create-receipe.dto';
import { RecipeFilter } from './dtos/recipe-filter.dto';
import { SearchReceipeDto } from './dtos/search-receipe.dto';
import { Recipe, RecipeDocument } from './schemas/recipes.schemas';


@Injectable()
export class RecipesService {

  constructor(
    @InjectModel(Recipe.name)
    private readonly recipesModule: Model<RecipeDocument>,
  ) { }

  async getAll(query: SearchReceipeDto): Promise<Recipe[]> {
    try {
      const filter: RecipeFilter = {};
      if (query.name) {
        filter.name = { $regex: query.name, $options: 'i' };
      }

      if (query.cookingTime) {
        filter.cookingTime = query.cookingTime;
      }

      if (query.ingredients) {
        filter.ingredients = { $all: query.ingredients };
      }

      const recipes = await this.recipesModule.find(filter).exec();

      if (recipes.length === 0) {
        throw new NotFoundException('No recipes found matching the criteria');
      }

      return recipes;
    } catch (error) {

      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to fetch recipes');
      }
    }
  }

  async createRecipe(payload: CreateReceipeDto): Promise<Recipe> {
    try {
      const recipe = new this.recipesModule(payload);
      await recipe.save();
      return recipe;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Recipe with this name already exists');
      }
      throw new Error(error.message);
    }
  }

  async addCookingTime(dto: AddCookingTimeDto): Promise<UpdateWriteOpResult> {
    try {
      const result: UpdateWriteOpResult = await this.recipesModule.updateOne(
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
