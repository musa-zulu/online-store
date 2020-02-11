export class ShoppingCartItem {
  shoppingCartId: string;
  foodItemId: string;
  dishName: string;
  foodItemDescription: string;
  price: number;
  foodCategoryId: string;
  imagePath: string;
  quantity: number;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  get totalPrice() { return this.price * this.quantity; }
}
