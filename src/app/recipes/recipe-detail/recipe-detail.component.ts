import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { AlertService } from '../../shared/alert.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;
  public id: number;
  private _sub: Subscription;
  public openModal = false;

  constructor(
    private _recipesService: RecipesService,
    private _route: ActivatedRoute,
    private _router: Router,
    private readonly _alertService: AlertService,
    private _dataStorageService: DataStorageService,
  ) { }

  ngOnInit(): void {
    this._sub = this._route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this._recipesService.getRecipeByIndex(this.id);
        }
      );
  }

  public ngOnDestroy(): void {
    if (this._sub) this._sub.unsubscribe();
  }

  public handleAddToShoppingList() {
    this._recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
    this._dataStorageService.storeShoppingList();
    this._alertService.show('Your ingredients added to Shopping List!');
  }

  public handleEditRecipe() {
    this._router.navigate(['edit'], { relativeTo: this._route } )
  }

  public handleDeleteRecipe() {
    this.openModal = true;
  }

  private _deleteRecipe() {
    this._recipesService.deleteRecipe(this.id);
    this._dataStorageService.storeRecipes();
    this._router.navigate(['../'], {relativeTo: this._route})
  }

  handleCloserModal(cond: boolean) {
    if (cond) {
      this._deleteRecipe();
      this.openModal = false;
    } else {
      this.openModal = false;
    }
  }

}
