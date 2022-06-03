import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;


  constructor(
    private _recipesService: RecipesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this._route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this._recipesService.getRecipeByIndex(this.id);
        }
      )
  }

  handleAddToShoppingList() {
    this._recipesService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  handleEditRecipe() {
    this._router.navigate(['edit'], {relativeTo: this._route} )
  }

  handleDeleteRecipe() {
    this._recipesService.deleteRecipe(this.id);
    this._router.navigate(['../'], {relativeTo: this._route})
  }

}
