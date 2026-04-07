import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';
import { CategorieDetailComponent } from './categorie-detail/categorie-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CategorieListComponent,
    CategorieFormComponent,
    CategorieDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule {}
