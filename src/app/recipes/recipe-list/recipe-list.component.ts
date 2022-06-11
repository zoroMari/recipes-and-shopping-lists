import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/alert.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private _recipeService: RecipesService,
    private _dataStorageService: DataStorageService,
    private _alertService: AlertService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.recipes = this._recipeService.getRecipes;

    this.subscription = this._recipeService.recipesChanged.subscribe(
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

  handleAddNewRecipe() {
    this._router.navigate(['new'], { relativeTo: this._route });
  }

  handleSaveData() {
    this._dataStorageService.storeRecipes();
    this._alertService.show('Recipes were saved!');
  }

  handleFetchData() {
    this._dataStorageService.fetchRecipes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
