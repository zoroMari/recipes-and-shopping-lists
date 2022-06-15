import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[adHost]'
})
export class ViewContainerDirective {
  constructor (public viewContainerRef: ViewContainerRef) {}
}
