import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass']
})
export class RecipeListComponent implements OnInit {
  @Output() getRecipeSelectedInfo = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Tiramisu', 'Some description here', 'https://cdn.pixabay.com/photo/2017/03/19/18/22/italian-food-2157246_1280.jpg'
    ),
    new Recipe(
      'Lasagna', 'Some description here', 'https://www.maxpixel.net/static/photo/1x/Meal-Lasagna-Pasta-Sauce-Cheese-Meat-Food-Slice-5981242.jpg'
    ),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeWasSelected(recipeSelected: Recipe) {
    this.getRecipeSelectedInfo.emit(recipeSelected);
  }

}
