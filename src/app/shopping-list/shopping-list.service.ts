import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredients.model";

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private _ingredients: Ingredient[] = [
    new Ingredient('eggs', 6),
    new Ingredient('ladyfingers', 40),
    new Ingredient('mascarpone(pacc)', 2)
  ];

  get getIngredients() {
    return this._ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
   this._ingredients.push(ingredient);
   this.ingredientsChanged.emit(this.getIngredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.getIngredients);
  }
}
