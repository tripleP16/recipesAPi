import { Recipe, RecipeSchema } from './schemas/recipes.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  providers: [RecipesService],
  controllers: [RecipesController],
})
export class RecipesModule {}
