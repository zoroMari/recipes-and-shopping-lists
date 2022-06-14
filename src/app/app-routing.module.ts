import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { RecipeDetailDefaultComponent } from "./recipes/recipe-detail/recipe-detail-default/recipe-detail-default.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { CanActivateService } from "./recipes/recipes-canActivate.service";
import { RecipesComponent } from "./recipes/recipes.component";
import { NotFoundPageComponent } from "./shared/not-found-page/not-found-page.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children: [
    {
      path: '',
      component: RecipeDetailDefaultComponent,
      pathMatch: 'full',
      canActivate: [AuthGuard],
    },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent, canActivate: [CanActivateService] },
    { path: ':id/edit', component: RecipeEditComponent, canActivate: [CanActivateService] },
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: NotFoundPageComponent },
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

