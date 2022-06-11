import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[];
  private _subscription: Subscription;

  constructor(
    private _recipeService: RecipesService,
    private _dataStorageService: DataStorageService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.recipes = this._recipeService.getRecipes;

    this._subscription = this._recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )

    this._dataStorageService.fetchRecipes()
      .subscribe((recipes: Recipe[]) => {
        if (recipes) {
          this.recipes = recipes;
        } else this.recipes = [];
      });

  }

  public handleAddNewRecipe() {
    this._router.navigate(['new'], { relativeTo: this._route });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
