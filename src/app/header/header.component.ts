import { Component } from "@angular/core";
import { RecipesService } from "../recipes/recipes.service";
import { DataStorageService } from "../shared/data-storage.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public collapsed: boolean = true;

  constructor(
    private _dataStorageService: DataStorageService,
    private _recipesService: RecipesService,
    private _shoppingListService: ShoppingListService,
  ) {}

  public handleSaveData() {
    this._dataStorageService.storeRecipes();
  }

  public handleFetchData() {
    this._dataStorageService.fetchRecipes().subscribe(
      recipes => {
        if (recipes) {
          this._recipesService.setRecipes(recipes);
        } else return;
      }
    );

    // this._dataStorageService.fetchShoppingList().subscribe(
    //   ingredients => this._shoppingListService.setShopList(ingredients)
    // )
  }
}
