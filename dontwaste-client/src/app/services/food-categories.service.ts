import { Injectable } from '@angular/core';
import { ServerConfig } from './server-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodCategory } from '../models/food-category';
import { GetFoodCategoryDto } from '../Dtos/get-food-category-dto';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodCategoriesService {

  private readonly apiURL = 'foodCategories';

  constructor(private http: HttpClient,
              private serverConfig: ServerConfig) { }

  public getFoodCategories(): Observable<any>  {
    return this.http
        .get<FoodCategory[]>(this.serverConfig.getBaseUrl() +  this.apiURL, this.serverConfig.getRequestOptions())
        .pipe(
          retry(1),
          catchError(this.handleError));
  }

  public getFoodCategoryById(getFoodCategoryDto: GetFoodCategoryDto) {
    return this.http
        .post<FoodCategory>(this.serverConfig.getBaseUrl() + this.apiURL + '/', getFoodCategoryDto)
        .toPromise();
  }

  public addFoodCategory(foodCategory: FoodCategory): Promise<any> {
    return this.http
        .post(this.serverConfig.getBaseUrl() + this.apiURL, foodCategory, this.serverConfig.getRequestOptions())
        .toPromise();
  }

  public updateFoodCategory(foodCategory: FoodCategory): Promise<any> {
    return this.http
        .put(this.serverConfig.getBaseUrl() + this.apiURL + '/', foodCategory, this.serverConfig.getRequestOptions())
        .toPromise();
  }

  public deleteFoodCategory(foodCategoryId: string) {
    return this.http
    .delete<FoodCategory>(this.serverConfig.getBaseUrl() + this.apiURL + '/' + foodCategoryId, this.serverConfig.getRequestOptions())
    .toPromise();
  }

  private handleError(error: any) {
    // tslint:disable-next-line: deprecation
    return Observable.throw(error);
  }
}
