import { RecipesService } from './recipes.service';
import { Controller, Get } from '@nestjs/common';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getAllRecipes(): Promise<any> {
    return this.recipesService.getAll();
  }
}
