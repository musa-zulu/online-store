import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodCategoriesListComponent } from './dash-bord/food-categories/food-categories-list/food-categories-list.component';
import { DashBordComponent } from './dash-bord/dash-bord.component';
import { FoodItemsComponent } from './dash-bord/food-items/food-items.component';
import { FoodItemsListComponent } from './dash-bord/food-items/food-items-list/food-items-list.component';
import { OrdersComponent } from './dash-bord/orders/orders.component';
import { ShoppingCartComponent } from './dash-bord/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashbord', pathMatch: 'full'},
  {path: 'dashbord', component: DashBordComponent},
  {path: 'foodCategories', component: FoodCategoriesListComponent},
  {path: 'foodItems', component: FoodItemsListComponent},
  {path: 'foodItems/new', component: FoodItemsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
