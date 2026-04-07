import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { FxrateListComponent } from './fxrate-list/fxrate-list.component';
import { FxrateFormComponent } from './fxrate-form/fxrate-form.component';
import { FinanceKpiComponent } from './finance-kpi/finance-kpi.component';

const routes: Routes = [
  { path: '', redirectTo: 'budgets', pathMatch: 'full' },
  { path: 'budgets', component: BudgetListComponent },
  { path: 'budgets/create', component: BudgetFormComponent },
  { path: 'budgets/edit/:id', component: BudgetFormComponent },
  { path: 'expenses', component: ExpenseListComponent },
  { path: 'expenses/create', component: ExpenseFormComponent },
  { path: 'expenses/edit/:id', component: ExpenseFormComponent },
  { path: 'fx-rates', component: FxrateListComponent },
  { path: 'fx-rates/create', component: FxrateFormComponent },
  { path: 'fx-rates/edit/:id', component: FxrateFormComponent },
  { path: 'kpi', component: FinanceKpiComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule {}
