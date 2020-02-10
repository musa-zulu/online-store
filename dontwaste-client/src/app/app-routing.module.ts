import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodCategoriesListComponent } from './food-categories/food-categories-list/food-categories-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/foodCategories', pathMatch: 'full'},
  {path: 'foodCategories', component: FoodCategoriesListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
