import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.sass']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeItem: Recipe;

  constructor(private _recipesService: RecipesService) { }

  ngOnInit(): void {
  }

  onSelectRecipeItem() {
    this._recipesService.recipeSelected.emit(this.recipeItem);
  }
}

