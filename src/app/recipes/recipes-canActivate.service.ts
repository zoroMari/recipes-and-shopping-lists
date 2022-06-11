import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { RecipesService } from "./recipes.service";


@Injectable({ providedIn: 'root' })
export class CanActivateService implements CanActivate {
  constructor(
    private _router: Router,
    private _recipesService: RecipesService,
  ) {}

  public canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this._recipesService.getRecipes.length !== 0) {
      return true
    } else {
      this._router.navigate(['/recipes']);
    }
  }
}
