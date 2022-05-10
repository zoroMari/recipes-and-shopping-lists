import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'recipe-app';
  loadedFeature: string = 'recipes';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
