import { Component, OnInit } from '@angular/core';
import { FoodCategoriesService } from 'src/app/services/food-categories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FoodItemsService } from 'src/app/services/food-items.service';
import 'rxjs/add/operator/take';
import { FoodItem } from 'src/app/models/food-item';
import { timer } from 'rxjs/internal/observable/timer';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.css']
})
export class FoodItemsComponent implements OnInit {
  static readonly POLLING_INTERVAL = 4000;
  categories$;
  foodItem: FoodItem = new FoodItem();
  foodItemId;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private foodCategoriesService: FoodCategoriesService,
    private foodItemService: FoodItemsService) {
      this.getFoodCategories().subscribe((foodCategories) => {
        this.categories$ = foodCategories.data;
        console.log();
      });

      this.foodItemId = this.route.snapshot.paramMap.get('foodItemId');
      if (this.foodItemId) {
      this.getByFoodItem();
    }
  }

  private getFoodCategories() {
    return timer(0, FoodItemsComponent.POLLING_INTERVAL)
    .pipe(switchMap(() => this.foodCategoriesService.getFoodCategories()));
  }

  getByFoodItem() {
    return  this.foodItemService.getFoodItem(this.foodItemId)
    .subscribe((foodItem) => {
      this.foodItem = foodItem.data;
      console.log();
    });
  }

  save(foodItem) {
    if (foodItem.foodItemId) {
       this.foodItemService.updateFoodItem(foodItem);
    } else {
      this.foodItemService.addFoodItem(foodItem);
    }

    this.router.navigate(['foodItems']);
  }

  ngOnInit() {
  }
}
