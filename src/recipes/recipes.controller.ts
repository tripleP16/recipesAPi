import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { UpdateWriteOpResult } from 'mongoose';
import { AddCookingTimeDto } from './dtos/add-cooking-time.dto';
import { CreateReceipeDto } from './dtos/create-receipe.dto';
import { SearchReceipeDto } from './dtos/search-receipe.dto';
import { RecipesService } from './recipes.service';
import { Recipe } from './schemas/recipes.schemas';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) { }

  @Get()
  async getAllRecipes(
    @Query() query: SearchReceipeDto,
  ): Promise<Recipe[]> {
    return this.recipesService.getAll(query);
  }


  @Post()
  async createRecipe(@Body() payload: CreateReceipeDto): Promise<Recipe> {
    return this.recipesService.createRecipe(payload);
  }


  @Patch('/add/cooking/time')
  async addCookingTime(@Body() dto: AddCookingTimeDto): Promise<UpdateWriteOpResult> {
    return this.recipesService.addCookingTime(dto);
  }

}
