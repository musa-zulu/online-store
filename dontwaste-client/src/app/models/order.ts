import { FoodItem } from './food-item';

export class Order {
  orderId: string;
  dateCreated: number;
  dateLastModified: number;
  totalPrice: number;
  orderNumber: number;
  foodItems: FoodItem[] = [];
}
