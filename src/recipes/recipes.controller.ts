import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { AddCookingTimeDto } from './dtos/add-cooking-time.dto';
import { CreateReceipeDto } from './dtos/create-receipe.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) { }

  @Get()
  async getAllRecipes(): Promise<any> {
    return this.recipesService.getAll();
  }



  @Post()
  async createRecipe(@Body() payload: CreateReceipeDto): Promise<any> {
    return this.recipesService.createRecipe(payload);
  }


  @Patch('/add/cooking/time')
  async addCookingTime(@Body() dto: AddCookingTimeDto): Promise<any> {
    return this.recipesService.addCookingTime(dto);
  }

}
