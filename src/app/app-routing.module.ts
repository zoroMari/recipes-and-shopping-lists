import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NotFoundPageComponent } from "./shared/not-found-page/not-found-page.component";
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { AuthModule } from "./auth/auth.module";

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => RecipesModule },
  { path: 'shopping-list', loadChildren: () => ShoppingListModule },
  { path: 'auth', loadChildren: () => AuthModule },
  { path: '**', component: NotFoundPageComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        preloadingStrategy: PreloadAllModules,
      }
    ),
  ],

  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {

}

