import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    RecipesModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.qgtv0hf.mongodb.net/recipes-book?authSource=admin&retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
