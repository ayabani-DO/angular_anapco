import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetMonthly } from 'src/app/models/budget-monthly';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})
export class BudgetListComponent implements OnInit {

  budgets: BudgetMonthly[] = [];
  loading = true;
  errorMessage = '';

  constructor(private budgetService: BudgetService, private router: Router) {}

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.loading = true;
    this.budgetService.getAll().subscribe({
      next: (data) => {
        this.budgets = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load budgets';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteBudget(id: number): void {
    if (!confirm('Are you sure you want to delete this budget?')) return;

    this.budgetService.delete(id).subscribe({
      next: () => this.loadBudgets(),
      error: (err) => {
        this.errorMessage = 'Failed to delete budget';
        console.error(err);
      }
    });
  }

  goToCreate(): void {
    this.router.navigate(['/finance/budgets/create']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/finance/budgets/edit', id]);
  }
}
