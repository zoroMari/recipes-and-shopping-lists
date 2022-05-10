import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.sass']
})
export class ShoppingEditComponent implements OnInit {
  // ingredient: Ingredient;
  @Output() ingredientForAdding = new EventEmitter<Ingredient>();
  @ViewChild('nameInput', { static: true }) nameImput: ElementRef;
  @ViewChild('amountInput', { static: true }) amountImput: ElementRef;


  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient() {
    const ingName = this.nameImput.nativeElement.value;
    const ingAmount = this.amountImput.nativeElement.value;

    const newIngredient = new Ingredient(ingName, ingAmount);

    this.ingredientForAdding.emit(newIngredient);
  }
}
