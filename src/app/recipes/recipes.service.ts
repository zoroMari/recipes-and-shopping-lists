import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipesService {
  public recipesChanged = new Subject<Recipe[]>();

  constructor(
    private _shoppingListService: ShoppingListService,
  ) {}

  private _recipes: Recipe[] = [];

  get getRecipes() {
    return this._recipes.slice();
  }

  public getRecipeByIndex(index: number) {
    return this._recipes[index];
  }

  public setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.recipesChanged.next(this.getRecipes);
  }

  public findRecipeByName(name: string) {
    return this._recipes.find((item) => item.name === name);
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this._shoppingListService.addIngredients(ingredients);
  }

  public addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes);
  }

  public updateRecipe(index: number, newRecipe: Recipe) {
    this._recipes[index] = newRecipe;
    this.recipesChanged.next(this.getRecipes);
  }

  public deleteRecipe(index: number) {
    this._recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes);
  }
}
