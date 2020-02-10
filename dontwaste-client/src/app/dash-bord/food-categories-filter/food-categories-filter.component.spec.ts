import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCategoriesFilterComponent } from './food-categories-filter.component';

describe('FoodCategoriesFilterComponent', () => {
  let component: FoodCategoriesFilterComponent;
  let fixture: ComponentFixture<FoodCategoriesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodCategoriesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCategoriesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
