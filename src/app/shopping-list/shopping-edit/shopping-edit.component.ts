import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.sass']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form') slForm: NgForm;
  private _subscription: Subscription;
  public editMode = false;
  private _editItemIndex: number;
  private _editedItem: Ingredient;

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this._subscription = this._shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this._editItemIndex = index;
          this._editedItem = this._shoppingListService.getIngredientsByIndex(index);
          this.slForm.setValue({
            name: this._editedItem.name,
            amount: this._editedItem.amount,
          })
        }
      )
  }

  public handleSubmitIngredient(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(
      this._firstLetterToUpperCase(value.name), value.amount
    );

    if (this.editMode) {
      this._shoppingListService.updateIngredient(this._editItemIndex, newIngredient);
    } else {
      this._shoppingListService.addIngredient(newIngredient);
    }

    this.editMode = false;
    form.reset();
  }

  handleDeleteIngredient() {
    this._shoppingListService.deleteIngredient(this._editItemIndex);

    this.editMode = false;
    this.slForm.reset();
  }

  handleClearForm() {
    this.slForm.reset();
    this.editMode = false;
  }

  private _firstLetterToUpperCase(word: string) {
   return word[0].toUpperCase() + word.slice(1);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
