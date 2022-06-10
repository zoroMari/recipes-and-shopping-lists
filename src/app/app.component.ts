import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes/recipes.service';
import { AlertService } from './shared/alert.service';
import { ModalService } from './shared/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(
    public readonly alertService: AlertService,
    public readonly modalService: ModalService,
  ) {}

  ngOnInit(): void {}

  

}
