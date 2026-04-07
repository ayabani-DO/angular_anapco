import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';
import { CategorieDetailComponent } from './categorie-detail/categorie-detail.component';

const routes: Routes = [
  { path: '', component: CategorieListComponent },
  { path: 'create', component: CategorieFormComponent },
  { path: 'edit/:id', component: CategorieFormComponent },
  { path: ':id', component: CategorieDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
