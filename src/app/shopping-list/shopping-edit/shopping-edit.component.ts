import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.sass']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: true }) nameImput: ElementRef;
  @ViewChild('amountInput', { static: true }) amountImput: ElementRef;

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  handleAddIngredient() {
    const ingName = this.nameImput.nativeElement.value;
    const ingAmount = this.amountImput.nativeElement.value;

    const newIngredient = new Ingredient(
      this._firstLetterToUpperCase(ingName), ingAmount
    );

    this._shoppingListService.addIngredient(newIngredient);
  }


  private _firstLetterToUpperCase(word: string) {
   return word[0].toUpperCase() + word.slice(1);
  }
}
