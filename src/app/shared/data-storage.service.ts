import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipesService } from "../recipes/recipes.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private _http: HttpClient,
    private _recipeService: RecipesService,
  ) {}

  public storeRecipes() {
    const recipes: Recipe[] = this._recipeService.getRecipes;

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
              return recipes.map(item => {
                return {
                  ...item,
                  ingredients: item.ingredients ? item.ingredients : []
                };
              });
            }
          ),
          tap(
            (recipes) => {
              this._recipeService.setRecipes(recipes);
            }
          )
        )
  }
}
