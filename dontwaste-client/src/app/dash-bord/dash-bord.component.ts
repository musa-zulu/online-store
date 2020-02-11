import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../models/food-item';
import { Observable, timer } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { FoodItemsService } from '../services/food-items.service';
import { FoodCategoriesService } from '../services/food-categories.service';
import { FoodCategory } from '../models/food-category';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dash-bord',
  templateUrl: './dash-bord.component.html',
  styleUrls: ['./dash-bord.component.css']
})
export class DashBordComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private foodItemService: FoodItemsService,
              private shoppingCartService: ShoppingCartService,
              private foodCategoriesService: FoodCategoriesService) { }
  static readonly POLLING_INTERVAL = 10000;
  /*foodItems: FoodItem[] = [];
  filteredFoodItems: FoodItem[] = [];
  foodCategory: FoodItem;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private foodItemService: FoodItemsService,
    private shoppingCartService: ShoppingCartService
  ) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.foodItemService
      .getFoodItems()
      .map(foodItems => {
        this.foodItems = foodItems;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        //this.foodCategory = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredFoodItems = (this.foodCategory) ?
    this.foodItems.filter(p => p.foodCategoryId === this.foodCategory.foodCategoryId) :
    this.foodItems;
  }*/
  currentCategory: string;
  categories: FoodCategory[];
  foodItems: FoodItem[] = [];
  filteredFoodItems: FoodItem[] = [];
  cart: ShoppingCart;

  async ngOnInit() {
    this.getCart();
    this.getAllCategories();
    this.setCurrentCategory(null);
  }

  getCategories() {
      return timer(0, DashBordComponent.POLLING_INTERVAL)
      .pipe(switchMap(() => this.foodCategoriesService.getFoodCategories()));
  }

  setCurrentCategory(newCategory: string) {
      this.currentCategory = newCategory;
      if (newCategory === null)   {
        this.getAllCategories();
      }
      this.applyFilter(newCategory);
  }

  getCart() {
    this.shoppingCartService.getCart().subscribe((cart) => {
      this.cart = cart;
      console.log();
    });
  }

  private getAllCategories() {
    this.getCategories()
    .subscribe((foodCategories) => {
      this.categories = foodCategories.data;
      console.log();
    });
  }

  private applyFilter(foodCategoryId: string) {
    let category = [];
    if (foodCategoryId !== null) {
      category = this.categories.filter(x => x.foodCategoryId === foodCategoryId);
      this.foodItems = category[0].foodItems;
      this.filteredFoodItems = this.foodItems;
    } else {
      this.categories.forEach(cItem => {
        cItem.foodItems.forEach(item => {
          this.foodItems.push(item);
        });
      });
      this.filteredFoodItems = this.foodItems;
    }
  }
}
