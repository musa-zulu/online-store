import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodCategory } from 'src/app/models/food-category';
import { FoodCategoriesService } from 'src/app/services/food-categories.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-food-categories-list',
  templateUrl: './food-categories-list.component.html',
  styleUrls: ['./food-categories-list.component.css']
})
export class FoodCategoriesListComponent implements OnInit {

  constructor(private foodCategoriesService: FoodCategoriesService, public dialog: MatDialog) { }

  static readonly POLLING_INTERVAL = 1000;
  foodCategories: FoodCategory[];
  filteredFoodCategories: FoodCategory[] = [];
  displayedColumns: string[] = ['description', 'action'];
  tableDataResource = new MatTableDataSource<FoodCategory>();

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  async ngOnInit() {
    this.getFoodCategories()
    .subscribe((foodCategories) => {
      this.foodCategories = foodCategories.data;
      this.initializeTable(this.foodCategories);
      console.log();
    });
  }

  openDialog(action: any, foodCategory) {
    foodCategory.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
    width: '250px',
    data: foodCategory
  });

    dialogRef.afterClosed().subscribe(result => {
    if (action === 'Add') {
      this.addFoodCategory(result.data);
    } else if (action === 'Update') {
       this.updateFoodCategory(result.data);
    } else if (action === 'Delete') {
     this.deleteFoodCategory(result.data);
    }
  });

    this.dialog.afterAllClosed.subscribe(() => {
    this.refreshTable();
  });
  }

  getFoodCategories() {
    return timer(0, FoodCategoriesListComponent.POLLING_INTERVAL)
    .pipe(switchMap(() => this.foodCategoriesService.getFoodCategories()));
  }

  addFoodCategory(foodCategory: FoodCategory) {
    this.foodCategoriesService.addFoodCategory(foodCategory);
    this.refreshTable();
  }

  updateFoodCategory(foodCategory: FoodCategory) {
    this.foodCategoriesService.updateFoodCategory(foodCategory);
    this.refreshTable();
  }

  deleteFoodCategory(foodCategory: FoodCategory) {
    this.foodCategoriesService.deleteFoodCategory(foodCategory.foodCategoryId);
    this.refreshTable();
  }

  private initializeTable(foodCategories: FoodCategory[]) {
    this.tableDataResource = new MatTableDataSource<FoodCategory>(foodCategories);
  }

  filter(query: string) {
    const filteredFoodCategories = (query) ?
      this.foodCategories.filter(p => p.description.toLowerCase().includes(query.toLowerCase())) :
      this.foodCategories;

    this.initializeTable(filteredFoodCategories);
  }

  refreshTable() {
    this.getFoodCategories();
  }
}
