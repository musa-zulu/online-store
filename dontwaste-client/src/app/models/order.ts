import { ShoppingCart } from './shopping-cart';

export class Order {
  orderId: string;
  datePlaced: number;
  dateLastModified: number;
  foodItems: any[];

  constructor(public shipping: any, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();

    this.foodItems = shoppingCart.items.map(i => {
      return {
        product: {
         // title: i.title,
         // imagePath: i.imageUrl,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      };
    });
  }
}
