import { ShoppingCartItem } from './shopping-cart-item';
import { FoodItem } from './food-item';

export class ShoppingCart {
  constructor() {
  }

  private static storageName = 'CartItem';
  items: ShoppingCartItem[] = [];
  cartId: string;

  static totalPrice(foodItems: FoodItem[]) {
    let sum = 0;
    foodItems.forEach(item => {
      sum += (item.price * item.quantity);
    });
    return sum;
  }

  static getShoppingCart() {
    const cart: FoodItem[] = [];
    const length = localStorage.length;
    if (length > 0) {
      for (let i = 0; i <= length; i++) {
        if (localStorage.getItem(this.storageName + i) !== null) {
          const obj = JSON.parse(localStorage.getItem(this.storageName + i));

          cart.push({
            dishName: obj[0].dishName,
            foodCategoryId: obj[0].foodCategoryId,
            foodItemDescription: obj[0].foodItemDescription,
            imagePath: obj[0].imageUrl,
            foodItemId: obj[0].foodItemId,
            price: obj[0].price,
            quantity: obj[0].quantity,
            shoppingCartId: obj[0].shoppingCartId
          });
        }
      }
    }
    return cart;
  }

 static getQuantity(foodItem: FoodItem) {

    return this.getShoppingCart().filter(x => x.foodItemId === foodItem.foodItemId)
    .map(m => m.dishName ? 1 : 0 as number)
    .reduce((count, m) => count + m, 0);

  }

  updateCart(item: FoodItem) {
    this.items.push({
        foodItemId: item.foodItemId,
        price: item.price,
        shoppingCartId: item.shoppingCartId,
        imagePath: item.imagePath,
        quantity: item.quantity || 1,
        dishName: item.dishName,
        totalPrice: (item.price * 1),
        foodCategoryId: item.foodCategoryId,
        foodItemDescription: item.foodItemDescription
    });
    localStorage.setItem('CartItem' + localStorage.length, JSON.stringify(this.items));
    this.getTotalCount();
  }

  getTotalCount() {
    return localStorage.length;
  }
}
