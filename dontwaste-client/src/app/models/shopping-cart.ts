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
                foodItemId: obj[0].foodItemId,
                price: obj[0].price,
                quantity: obj[0].quantity,
                shoppingCartId: obj[0].shoppingCartId,
                key: obj[0].key,
                totalPrice: obj[0].totalPrice
             });
        }
      }
    }
    return cart;
  }

 static getQuantity(foodItem: FoodItem) {

    return this.getShoppingCart()
    .filter(x => x.foodItemDescription.toLocaleLowerCase() === foodItem.foodItemDescription.toLocaleLowerCase())
    .map(m => m.quantity ? 1 : 0 as number)
    .reduce((count, m) => count + m, 0);

  }

  updateCart(item: FoodItem) {
    const cart = ShoppingCart.getShoppingCart();
    const length = localStorage.length;

    if (length > 0) {
      const element = cart
      .filter(x => x.dishName.toLocaleLowerCase() === item.dishName.toLocaleLowerCase())[0];

      if (element) {
         this.updateLocalStorage(element);
      } else {
          const isNewItem = true;
          this.setValuesOn(item, isNewItem);
          localStorage.setItem('CartItem' + localStorage.length, JSON.stringify(this.items));
      }
    }

    if (ShoppingCart.getShoppingCart().length === 0) {
        const isNewItem = true;
        this.setValuesOn(item, isNewItem);
        localStorage.setItem('CartItem' + localStorage.length, JSON.stringify(this.items));
    }
  }

  getTotalCount() {
    let count = 0;
    ShoppingCart.getShoppingCart().forEach(el => {
      count += el.quantity;
    });
    return count;
  }

  setValuesOn(item: FoodItem, isNewItem = false) {
    const key = isNewItem ? ('CartItem' + localStorage.length) : item.key;
    this.items = [];
    this.items.push({
      foodItemId: item.foodItemId,
      price: item.price,
      shoppingCartId: item.shoppingCartId,
      quantity: item.quantity || 1,
      dishName: item.dishName,
      totalPrice: (item.price * (item.quantity || 1)),
      foodCategoryId: item.foodCategoryId,
      foodItemDescription: item.foodItemDescription,
      key
    });
  }

  removeFromCart(foodItem: FoodItem) {
    this.updateLocalStorage(foodItem);
  }

  updateLocalStorage(item: FoodItem) {
    localStorage.removeItem(item.key);
    item.quantity += 1;
    item.totalPrice = (item.price * item.quantity);
    this.setValuesOn(item);
    localStorage.setItem(item.key, JSON.stringify(this.items));
  }
}
