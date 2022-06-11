import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { AlertService } from '../../shared/alert.service';
import { ModalService } from 'src/app/shared/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;
  public id: number;
  private _sub: Subscription;

  constructor(
    private _recipesService: RecipesService,
    private _route: ActivatedRoute,
    private _router: Router,
    private readonly _alertService: AlertService,
    private readonly _modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this._sub = this._route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this._recipesService.getRecipeByIndex(this.id);
        }
      );

    this._sub.add(this._modalService.deleteData
      .subscribe(
        (toDelete: boolean) => {
          if (toDelete) this._deleteRecipe();
        }
      ));
  }

  public ngOnDestroy(): void {
    if (this._sub) this._sub.unsubscribe();
  }

  public handleAddToShoppingList() {
    this._recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
    this._alertService.show('Your ingredients added to Shopping List!');
  }

  public handleEditRecipe() {
    this._router.navigate(['edit'], { relativeTo: this._route } )
  }

  public handleDeleteRecipe() {
    this._modalService.openModal();
  }

  private _deleteRecipe() {
    this._recipesService.deleteRecipe(this.id);
    this._router.navigate(['../'], {relativeTo: this._route})
  }

}
