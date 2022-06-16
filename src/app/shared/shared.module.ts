import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { ModalComponent } from "./modal/modal.component";
import { ViewContainerDirective } from "./view-container.directive";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    ModalComponent,
    DropdownDirective,
    ViewContainerDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    ModalComponent,
    DropdownDirective,
    ViewContainerDirective,
    CommonModule,
  ],
})
export class SharedModule {

}
