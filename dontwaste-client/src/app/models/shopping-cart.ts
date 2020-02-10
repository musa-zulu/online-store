import { ShoppingCartItem } from './shopping-cart-item';
import { FoodItem } from './food-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [itemId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    // tslint:disable-next-line: forin
    for (const itemId in itemsMap) {
      const item = itemsMap[itemId];
      this.items.push(new ShoppingCartItem({ ...item, $key: itemId }));
    }
  }

  getQuantity(foodItem: FoodItem) {
    const item = this.itemsMap[foodItem.itemId];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    // tslint:disable-next-line: forin
    for (const itemId in this.items) {
      sum += this.items[itemId].totalPrice;
    }
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    // tslint:disable-next-line: forin
    for (const itemId in this.itemsMap) {
      count += this.itemsMap[itemId].quantity;
    }
    return count;
  }
}
