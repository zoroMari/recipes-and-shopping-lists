import { Component } from "@angular/core";
import { Recipe } from "./recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent {
  recipeSelectedForDetail: Recipe;

  handleOpenDetails(recipe: Recipe) {

  }

}

