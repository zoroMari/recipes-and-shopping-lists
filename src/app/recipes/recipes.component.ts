import { Component, OnInit } from "@angular/core";
import { Recipe } from "./recipe.model";
import { RecipesService } from "./recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  providers: [RecipesService],
})
export class RecipesComponent implements OnInit {
  recipeSelectedForDetail: Recipe;

  constructor(private _recipesService: RecipesService) {}

  ngOnInit(): void {
    this._recipesService.recipeSelected
      .subscribe(
        (recipe: Recipe) => {
          this.recipeSelectedForDetail = recipe;
        }
      )
  }

}

