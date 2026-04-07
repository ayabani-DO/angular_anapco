import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManualExpense, ManualExpenseCategory } from 'src/app/models/manual-expense';
import { ManualExpenseService } from 'src/app/services/manual-expense.service';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {

  expenseForm!: FormGroup;
  isEditMode = false;
  expenseId: number | null = null;
  loading = false;
  errorMessage = '';
  categoryOptions = Object.values(ManualExpenseCategory);
  sites: Site[] = [];

  constructor(
    private fb: FormBuilder,
    private expenseService: ManualExpenseService,
    private siteService: SiteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSites();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.expenseId = +idParam;
      this.loadExpense(this.expenseId);
    }
  }

  private initForm(): void {
    this.expenseForm = this.fb.group({
      amount: [0, Validators.required],
      date: ['', Validators.required],
      category: [ManualExpenseCategory.OTHER, Validators.required],
      currencyCode: [''],
      siteId: [null]
    });
  }

  private loadExpense(id: number): void {
    this.loading = true;
    this.expenseService.getById(id).subscribe({
      next: (exp) => {
        this.expenseForm.patchValue({
          amount: exp.amount,
          date: exp.date,
          category: exp.category,
          currencyCode: exp.currencyCode || '',
          siteId: exp.site?.idSite || null
        });
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load expense';
        this.loading = false;
        console.error(err);
      }
    });
  }

  private loadSites(): void {
    this.siteService.getAll().subscribe({
      next: (data) => this.sites = data,
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const fv = this.expenseForm.value;
    const expenseData: ManualExpense = {
      date: fv.date,
      category: fv.category,
      amount: fv.amount,
      currencyCode: fv.currencyCode || undefined,
      site: fv.siteId ? { idSite: fv.siteId } : undefined
    };

    const request$ = this.isEditMode
      ? this.expenseService.update(this.expenseId!, expenseData)
      : this.expenseService.create(expenseData, fv.siteId);

    request$.subscribe({
      next: () => this.router.navigate(['/finance/expenses']),
      error: (err) => {
        this.errorMessage = this.isEditMode ? 'Failed to update expense' : 'Failed to create expense';
        this.loading = false;
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/finance/expenses']);
  }
}
