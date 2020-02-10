import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerConfig } from './server-config';
import { Observable } from 'rxjs';
import { FoodCategory } from '../models/food-category';
import { retry, catchError } from 'rxjs/operators';
import { FoodItem } from '../models/food-item';

@Injectable({
  providedIn: 'root'
})
export class FoodItemsService {

  private readonly apiURL = 'foodItems';

  constructor(private http: HttpClient,
              private serverConfig: ServerConfig) { }

  public getFoodItems(): Observable<any>  {
    return this.http
        .get<FoodItem[]>(this.serverConfig.getBaseUrl() +  this.apiURL, this.serverConfig.getRequestOptions())
        .pipe(
          retry(1),
          catchError(this.handleError));
  }

  getFoodItem(foodItem: FoodItem): Observable<any> {
    return this.http
        .post<FoodItem>(this.serverConfig.getBaseUrl() + this.apiURL + '/', foodItem.foodItemId,
        this.serverConfig.getRequestOptions())
        .pipe(
          retry(1),
          catchError(this.handleError));
  }

  deleteFoodItem(foodItem: FoodItem) {
    return this.http
    .delete<FoodItem>(this.serverConfig.getBaseUrl() + this.apiURL + '/' + foodItem.foodItemId, this.serverConfig.getRequestOptions())
    .toPromise();
  }

  updateFoodItem(foodItem: FoodItem) {
    return this.http
        .put(this.serverConfig.getBaseUrl() + this.apiURL + '/', foodItem, this.serverConfig.getRequestOptions())
        .toPromise();
  }

  public addFoodItem(foodItem: FoodItem): Promise<any> {
    return this.http
    .post(this.serverConfig.getBaseUrl() + this.apiURL, foodItem, this.serverConfig.getRequestOptions())
    .toPromise();
  }

  private handleError(error: any) {
    // tslint:disable-next-line: deprecation
    return Observable.throw(error);
  }
}
