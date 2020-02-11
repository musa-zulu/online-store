import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerConfig } from './server-config';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/order';
import { FoodCategory } from '../models/food-category';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private readonly apiURL = 'carts';

  constructor(private http: HttpClient,
              private serverConfig: ServerConfig) { }

  public getCart(cartId: string): Observable<any>  {
    return this.http
        .post(this.serverConfig.getBaseUrl() + this.apiURL + '/', cartId,
        this.serverConfig.getRequestOptions())
        .pipe(
          retry(1),
          catchError(this.handleError));
  }

  addToCart(cart: FoodCategory) {
    return this.http
    .post(this.serverConfig.getBaseUrl() + this.apiURL, cart, this.serverConfig.getRequestOptions())
    .toPromise();
  }

  removeFromCart(cart: ShoppingCart) {
    return this.http
    .delete<Order>(this.serverConfig.getBaseUrl() + this.apiURL + '/' + cart.cartId, this.serverConfig.getRequestOptions())
    .toPromise();
  }

  clearCart() {
   // throw new Error("Method not implemented.");
  }

  private handleError(error: any) {
    // tslint:disable-next-line: deprecation
    return Observable.throw(error);
  }

}
