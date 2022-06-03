import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.sass']
})
export class RecipeEditComponent implements OnInit {
  public id: number;
  public editMode = false;

  public recipeForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _recipesService: RecipesService,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this._initForm();
      }
    )
  }

  private _initForm() {
    let recipeName: string = '';
    let imagePath: string = '';
    let description: string = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this._recipesService.getRecipeByIndex(this.id)
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(
                ingredient.amount,
                [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ]
              ),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredients,
    })
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  handleAddIngredient() {
    let control: FormGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(control);
  }

  handleSubmit() {
    if (this.editMode) {
      this._recipesService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this._recipesService.addRecipe(this.recipeForm.value);
    }

    this._router.navigate(['../'], {relativeTo: this._route});
  }

  handleCancelEditing() {
    this._router.navigate(['../'], {relativeTo: this._route});
  }

  handleDeleteIngredient(indexOfIngredient: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(indexOfIngredient);
  }

  handleDeleteAllIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).clear();
  }

}
