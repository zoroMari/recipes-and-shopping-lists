import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private _recipeService: RecipesService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this._recipeService.getRecipes;
  }

  handleAddNewRecipe() {
    this._router.navigate(['new'], { relativeTo: this._route });
  }
}
