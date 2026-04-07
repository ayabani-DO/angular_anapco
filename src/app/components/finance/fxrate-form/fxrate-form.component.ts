import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FxRate } from 'src/app/models/fx-rate';
import { FxRateService } from 'src/app/services/fx-rate.service';

@Component({
  selector: 'app-fxrate-form',
  templateUrl: './fxrate-form.component.html',
  styleUrls: ['./fxrate-form.component.css']
})
export class FxrateFormComponent implements OnInit {

  fxRateForm!: FormGroup;
  isEditMode = false;
  fxRateId: number | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private fxRateService: FxRateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.fxRateId = +idParam;
      this.loadFxRate(this.fxRateId);
    }
  }

  validCurrencies = ['EUR','USD','GBP','MAD','TND','JPY','CHF','CAD','AUD','CNY','INR','BRL','ZAR','SEK','NOK','DKK','PLN','CZK','HUF','RON','BGN','HRK','RUB','TRY','MXN','SGD','HKD','KRW','NZD','THB'];

  private initForm(): void {
    this.fxRateForm = this.fb.group({
      fromCurrency: ['EUR', Validators.required],
      toCurrency: ['', Validators.required],
      rate: [0, Validators.required],
      year: [new Date().getFullYear(), Validators.required],
      month: [new Date().getMonth() + 1, [Validators.required, Validators.min(1), Validators.max(12)]]
    });
  }

  private loadFxRate(id: number): void {
    this.loading = true;
    this.fxRateService.getById(id).subscribe({
      next: (fx) => {
        this.fxRateForm.patchValue(fx);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load FX rate';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.fxRateForm.invalid) {
      this.fxRateForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const fxRateData: FxRate = this.fxRateForm.value;

    const request$ = this.isEditMode
      ? this.fxRateService.update(this.fxRateId!, fxRateData)
      : this.fxRateService.create(fxRateData);

    request$.subscribe({
      next: () => this.router.navigate(['/finance/fx-rates']),
      error: (err) => {
        this.errorMessage = this.isEditMode ? 'Failed to update FX rate' : 'Failed to create FX rate';
        this.loading = false;
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/finance/fx-rates']);
  }
}
