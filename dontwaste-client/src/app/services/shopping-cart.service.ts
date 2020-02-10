import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerConfig } from './server-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private readonly url = 'api/v1/foodCategories';

  constructor(private http: HttpClient,
              private serverConfig: ServerConfig) { }

 /* getCart(): Observable<any> | PromiseLike<Observable<any>> {

  }*/

  getCart(){}

  addToCart(product: any) {

  }

}
