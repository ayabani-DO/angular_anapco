import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetMonthly } from 'src/app/models/budget-monthly';
import { BudgetService } from 'src/app/services/budget.service';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent implements OnInit {

  budgetForm!: FormGroup;
  isEditMode = false;
  budgetId: number | null = null;
  loading = false;
  errorMessage = '';
  sites: Site[] = [];

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
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
      this.budgetId = +idParam;
      this.loadBudget(this.budgetId);
    }
  }

  private initForm(): void {
    this.budgetForm = this.fb.group({
      year: [new Date().getFullYear(), Validators.required],
      month: [new Date().getMonth() + 1, [Validators.required, Validators.min(1), Validators.max(12)]],
      amount: [0, Validators.required],
      currencyCode: [''],
      siteId: [null]
    });
  }

  private loadBudget(id: number): void {
    this.loading = true;
    this.budgetService.getById(id).subscribe({
      next: (b) => {
        this.budgetForm.patchValue({
          year: b.year,
          month: b.month,
          amount: b.amount,
          currencyCode: b.currencyCode || '',
          siteId: b.site?.idSite || null
        });
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load budget';
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
    if (this.budgetForm.invalid) {
      this.budgetForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const fv = this.budgetForm.value;
    const budgetData: BudgetMonthly = {
      year: fv.year,
      month: fv.month,
      amount: fv.amount,
      currencyCode: fv.currencyCode || undefined,
      site: fv.siteId ? { idSite: fv.siteId } : undefined
    };

    const request$ = this.isEditMode
      ? this.budgetService.update(this.budgetId!, budgetData)
      : this.budgetService.create(budgetData, fv.siteId);

    request$.subscribe({
      next: () => this.router.navigate(['/finance/budgets']),
      error: (err) => {
        this.errorMessage = this.isEditMode ? 'Failed to update budget' : 'Failed to create budget';
        this.loading = false;
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/finance/budgets']);
  }
}
