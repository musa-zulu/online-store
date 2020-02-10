import { FoodItem } from './food-item';

export class FoodCategory {
  foodCategoryId: string;
  description: string;
  dateCreated: Date;
  dateLastModified: Date;
  foodItems: FoodItem[];
}
