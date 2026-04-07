import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManualExpense } from 'src/app/models/manual-expense';
import { ManualExpenseService } from 'src/app/services/manual-expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  expenses: ManualExpense[] = [];
  loading = true;
  errorMessage = '';

  constructor(private expenseService: ManualExpenseService, private router: Router) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.loading = true;
    this.expenseService.getAll().subscribe({
      next: (data) => {
        this.expenses = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load expenses';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteExpense(id: number): void {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    this.expenseService.delete(id).subscribe({
      next: () => this.loadExpenses(),
      error: (err) => {
        this.errorMessage = 'Failed to delete expense';
        console.error(err);
      }
    });
  }

  goToCreate(): void {
    this.router.navigate(['/finance/expenses/create']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/finance/expenses/edit', id]);
  }
}
