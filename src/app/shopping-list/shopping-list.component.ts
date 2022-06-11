import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private _ingredientsChangeSubscription: Subscription;

  constructor(
    private _shoppingListService: ShoppingListService,
    private _dataStorageService: DataStorageService,
  ) { }

  ngOnInit(): void {
    this.ingredients = this._shoppingListService.getIngredients;
    this._ingredientsChangeSubscription = this._shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
          this._dataStorageService.storeShoppingList();
        }
      )

    this._dataStorageService.fetchShoppingList()
        .subscribe(
          (ingredients => {
            if (ingredients) {
              this.ingredients = ingredients;
            } else {
              this.ingredients = [];
            }
          })
        )
  }

  handleEditItem(index: number) {
    this._shoppingListService.idForStarteEditing.next(index);
  }

  ngOnDestroy(): void {
    this._ingredientsChangeSubscription.unsubscribe();
  }

}
