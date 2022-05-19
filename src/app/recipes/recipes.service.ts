import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipesService {
  constructor(private _shoppingListService: ShoppingListService) {}

  public recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
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

  get getRecipe() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this._shoppingListService.addIngredients(ingredients);
  }
}