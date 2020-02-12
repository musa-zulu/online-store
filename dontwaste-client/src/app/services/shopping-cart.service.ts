import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerConfig } from './server-config';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private readonly apiURL = 'orders';

  constructor(private http: HttpClient,
              private serverConfig: ServerConfig) { }

  public getOrders(): Observable<any>  {
    return this.http
            .get(this.serverConfig.getBaseUrl() +  this.apiURL, this.serverConfig.getRequestOptions())
              .pipe(
                 retry(1),
                  catchError(this.handleError));
  }

  public getCart(cartId: string): Observable<any>  {
    return this.http
        .post(this.serverConfig.getBaseUrl() + this.apiURL + '/', cartId,
        this.serverConfig.getRequestOptions())
        .pipe(
          retry(1),
          catchError(this.handleError));
  }

  saveOrder(order: Order) {
    return this.http
    .post(this.serverConfig.getBaseUrl() + this.apiURL, order, this.serverConfig.getRequestOptions())
    .toPromise();
  }

  removeOrder(order: Order) {
    return this.http
    .delete<Order>(this.serverConfig.getBaseUrl() + this.apiURL + '/' + order.orderId, this.serverConfig.getRequestOptions())
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
