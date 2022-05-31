import { Injectable } from "@angular/core";

import { Subject } from 'rxjs';

import { Ingredient } from "../shared/ingredients.model";

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private _ingredients: Ingredient[] = [
    new Ingredient('Eggs', 6),
    new Ingredient('Ladyfingers', 40),
    new Ingredient('Mascarpone(pacc)', 2)
  ];

  get getIngredients() {
    return this._ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
   this._ingredients.push(ingredient);
   this.ingredientsChanged.next(this.getIngredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients);
  }
}
