import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipesService {
  public recipesChanged = new Subject<Recipe[]>();

  constructor(private _shoppingListService: ShoppingListService) {}

  private _recipes: Recipe[] = [
    new Recipe(
      'Tiramisu',
      'Some description here',
      'https://cdn.pixabay.com/photo/2017/03/19/18/22/italian-food-2157246_1280.jpg',
      [
        new Ingredient('Eggs', 5),
        new Ingredient('Eggs', 5),
      ],
    ),
    new Recipe(
      'Lasagna',
      'Some description here',
      'https://www.maxpixel.net/static/photo/1x/Meal-Lasagna-Pasta-Sauce-Cheese-Meat-Food-Slice-5981242.jpg',
      [
        new Ingredient('Meat', 500),
        new Ingredient('Pasta', 200),
      ],
      ),
  ];

  get getRecipes() {
    return this._recipes.slice();
  }

  public getRecipeByIndex(index: number) {
    return this._recipes[index];
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
