import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailDefaultComponent } from "./recipe-detail/recipe-detail-default/recipe-detail-default.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { CanActivateService } from "./recipes-canActivate.service";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
  { path: '', component: RecipesComponent, children: [
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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {

}
