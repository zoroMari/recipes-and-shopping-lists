import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipesService } from "../recipes/recipes.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Ingredient } from "./ingredients.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _recipeService: RecipesService,
    private _shoppingListService: ShoppingListService,
  ) {}

  public storeRecipes() {
    let recipes: Recipe[] = this._recipeService.getRecipes;

    this._http.put(
      'https://recipe-book-43f49-default-rtdb.firebaseio.com/recipes.json',
      recipes,
    ).subscribe(
      response => {}
    )
  }

  public fetchRecipes() {
    return this._http
      .get<Recipe[]>(
        'https://recipe-book-43f49-default-rtdb.firebaseio.com/recipes.json'
      ).pipe(
        map(
          recipes => {
            if (recipes) {
              return recipes.map(item => {
                return {
                  ...item,
                  ingredients: item.ingredients ? item.ingredients : []
                };
              });
            } else return;
          }
        ),
        tap(
          recipes => {
            if (recipes) {
              this._recipeService.setRecipes(recipes);
              this._router.navigate(['/recipes'])
            } else return;
          }
        ),
      );

  }

  public storeShoppingList() {
    const shopList: Ingredient[] = this._shoppingListService.getIngredients;

    localStorage.setItem('shopList', JSON.stringify(shopList));
  }

  public fetchShoppingList() {
    const ingredients: Ingredient[] = JSON.parse(localStorage.getItem('shopList'));
    if (ingredients) {
      this._shoppingListService.setShopList(ingredients);
    }

  }

}
