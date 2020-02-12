export class ShoppingCartItem {
  shoppingCartId: string;
  foodItemId: string;
  dishName: string;
  foodItemDescription: string;
  price: number;
  foodCategoryId: string;
  quantity: number;
  key: string;
  totalPrice: number;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }
}
