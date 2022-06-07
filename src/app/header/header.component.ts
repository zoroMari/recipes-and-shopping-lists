import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public collapsed: boolean = true;

  constructor(private _dataStorageService: DataStorageService) {}

  handleSaveData() {
    this._dataStorageService.storeRecipes();
  }

  handleFetchData() {
    this._dataStorageService.fetchRecipes().subscribe();
  }
}
