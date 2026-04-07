import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FinanceRoutingModule } from './finance-routing.module';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { FxrateListComponent } from './fxrate-list/fxrate-list.component';
import { FxrateFormComponent } from './fxrate-form/fxrate-form.component';
import { FinanceKpiComponent } from './finance-kpi/finance-kpi.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    BudgetListComponent,
    BudgetFormComponent,
    ExpenseListComponent,
    ExpenseFormComponent,
    FxrateListComponent,
    FxrateFormComponent,
    FinanceKpiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FinanceRoutingModule,
    SharedModule
  ]
})
export class FinanceModule {}
