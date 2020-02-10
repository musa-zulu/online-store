import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerConfig } from './server-config';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private readonly apiURL = 'api/v1/orders';

  constructor(private http: HttpClient,
              private serverConfig: ServerConfig) { }

  public getCart(): Observable<any>  {
    return this.http
        .get<ShoppingCart[]>(this.serverConfig.getBaseUrl() +  this.apiURL, this.serverConfig.getRequestOptions())
        .pipe(
          retry(1),
          catchError(this.handleError));
  }

  addToCart(product: any) {

  }

  private handleError(error: any) {
    // tslint:disable-next-line: deprecation
    return Observable.throw(error);
  }

}
