import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatDialogModule } from '@angular/material';
import { CustomFormsModule } from 'ng2-validation';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FoodCategoriesListComponent } from './food-categories/food-categories-list/food-categories-list.component';
import { FoodCategoriesService } from './services/food-categories.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// tslint:disable-next-line: max-line-length
import { FoodCategoriesFilterComponent } from './food-categories/food-categories-list/food-categories-filter/food-categories-filter.component';
import { FormsModule } from '@angular/forms';
import { DialogBoxComponent } from './food-categories/dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodCategoriesListComponent,
    NavBarComponent,
    FoodCategoriesFilterComponent,
    DialogBoxComponent,
  ],
  imports: [
    FormsModule,
    CustomFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    AngularFontAwesomeModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [FoodCategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
