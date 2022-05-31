import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private _ingredientsChangeSubscription: Subscription;

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this._shoppingListService.getIngredients;
    this._ingredientsChangeSubscription = this._shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      )
  }

  ngOnDestroy(): void {
    this._ingredientsChangeSubscription.unsubscribe();
  }

}
