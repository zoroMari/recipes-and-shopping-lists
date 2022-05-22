import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailDefaultComponent } from "./recipes/recipe-detail/recipe-detail-default/recipe-detail-default.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeDetailDefaultComponent, pathMatch: 'full' },
    { path: ':id', component: RecipeDetailComponent },
    // { path: ':name/edit', component: RecipeDetailComponent },
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],

  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {

}

