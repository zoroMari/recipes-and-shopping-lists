import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.sass']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeItem: Recipe;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }
}

