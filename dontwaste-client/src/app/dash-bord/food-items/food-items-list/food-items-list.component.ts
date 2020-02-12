import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodItem } from 'src/app/models/food-item';
import { MatTableDataSource, MatTable } from '@angular/material';
import { FoodItemsService } from 'src/app/services/food-items.service';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { switchMap } from 'rxjs/operators';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-food-items-list',
  templateUrl: './food-items-list.component.html',
  styleUrls: ['./food-items-list.component.css']
})
export class FoodItemsListComponent implements OnInit {
  static readonly POLLING_INTERVAL = 1000;
  foodItems: FoodItem[];
  filteredFoodItem: FoodItem[] = [];
  displayedColumns: string[] = ['dishName', 'price', 'action'];
  tableDataResource = new MatTableDataSource<FoodItem>();

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private foodItemsService: FoodItemsService,
              private confirmationDialogService: ConfirmationDialogService) { }

   ngOnInit() {
   this.getFoodItems().subscribe((foodItems) => {
      this.foodItems = foodItems.data;
      this.initializeTable(this.foodItems);
      console.log();
    });
  }

  getFoodItems() {
    return timer(0, FoodItemsListComponent.POLLING_INTERVAL)
            .pipe(switchMap(() => this.foodItemsService.getFoodItems()));
  }

  addFoodItem(foodItem: FoodItem) {
    this.foodItemsService.addFoodItem(foodItem);
    console.log(foodItem);
    this.refreshTable();
  }

  deleteFoodItem(foodItem: FoodItem) {
      this.foodItemsService.deleteFoodItem(foodItem);
      this.refreshTable();
  }

  private initializeTable(foodItems: FoodItem[]) {
    this.tableDataResource = new MatTableDataSource<FoodItem>(foodItems);
  }

  filter(query: string) {
    const filteredFoodItems = (query) ?
      this.foodItems.filter(p => p.foodItemDescription.toLowerCase().includes(query.toLowerCase())) :
      this.foodItems;

    this.initializeTable(filteredFoodItems);
  }

  refreshTable() {
    console.log();
    this.getFoodItems();
  }

  openConfirmationDialog(foodItem) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete... ?')
    .then((confirmed) => {
      if (confirmed) {
        this.deleteFoodItem(foodItem);
      }
      console.log('User confirmed:', confirmed);
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
