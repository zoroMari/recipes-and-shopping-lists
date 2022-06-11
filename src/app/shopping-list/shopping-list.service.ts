import { Injectable } from "@angular/core";

import { Subject } from 'rxjs';

import { Ingredient } from "../shared/ingredients.model";

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  public ingredientsChanged = new Subject<Ingredient[]>();
  public idForStarteEditing = new Subject<number>();

  private _ingredients: Ingredient[] = [];

  get getIngredients() {
    return this._ingredients.slice();
  }

  getIngredientsByIndex(index: number) {
    return this._ingredients[index];
  }

  public addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients);
  }

  public addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients);
  }

  public updateIngredient(index: number, newIngredient: Ingredient) {
    this._ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.getIngredients);
  }

  public deleteIngredient(index: number) {
    this._ingredients.splice(index, 1)
    this.ingredientsChanged.next(this.getIngredients);
  }

  public setShopList(newIngredients: Ingredient[]) {
    this._ingredients = newIngredients;
    this.ingredientsChanged.next(this.getIngredients);
  }

  private _firstLetterToUpperCase(word: string) {
    return word[0].toUpperCase() + word.slice(1);
   }
}
