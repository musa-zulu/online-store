import { Component, OnInit, Input } from '@angular/core';
import { FoodCategoriesService } from 'src/app/services/food-categories.service';

@Component({
  selector: 'app-food-categories-filter',
  templateUrl: './food-categories-filter.component.html',
  styleUrls: ['./food-categories-filter.component.css']
})
export class FoodCategoriesFilterComponent implements OnInit {
  foodCategories$: any;
  @Input('foodCategory') foodCategory;

  constructor(foodCategoriesService: FoodCategoriesService) {
    this.foodCategories$ = foodCategoriesService.getFoodCategories();
  }

  ngOnInit() {
  }

}
