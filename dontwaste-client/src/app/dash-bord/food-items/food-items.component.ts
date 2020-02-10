import { Component, OnInit } from '@angular/core';
import { FoodCategoriesService } from 'src/app/services/food-categories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FoodItemsService } from 'src/app/services/food-items.service';
import 'rxjs/add/operator/take';
import { FoodItem } from 'src/app/models/food-item';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.css']
})
export class FoodItemsComponent implements OnInit {

  categories$;
  foodItem: FoodItem = new FoodItem();
  foodItemId;
  public response: {dbPath: ''};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private foodCategoriesService: FoodCategoriesService,
    private foodItemService: FoodItemsService) {
    this.getFoodCategories();

    this.foodItemId = this.route.snapshot.paramMap.get('foodItemId');
    if (this.foodItemId) {
      this.getByFoodItem();
    }
  }

  private getFoodCategories() {
    return  this.foodCategoriesService.getFoodCategories().subscribe((foodCategories) => {
      this.categories$ = foodCategories.data;
      console.log();
    });
  }

  getByFoodItem() {
    this.foodItem = this.foodItemService.getFoodItem(this.foodItemId);
  }

  save(foodItem) {
    foodItem.imagePath = this.response.dbPath;
    if (foodItem.foodItemId) {
       this.foodItemService.updateFoodItem(foodItem);
    } else {
      this.foodItemService.addFoodItem(foodItem);
    }

    this.router.navigate(['foodItems']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) { return; }
    this.foodItemService.deleteFoodItem(this.foodItemId);
    this.router.navigate(['foodItems']);
  }
  ngOnInit() {
  }

  /*public createImgPath = (serverPath: string) => {
    return  this.foodItemService.createImagePath(serverPath);
  }*/

  public uploadFinished = (event) => {
    this.response = event;
  }

}