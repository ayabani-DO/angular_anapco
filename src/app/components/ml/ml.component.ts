import { Component, OnInit } from '@angular/core';
import { MlService } from 'src/app/services/ml.service';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/models/site';
import { MlPrediction, MlExplanation, MlHealth, MlFeature } from 'src/app/models/ml';

@Component({
  selector: 'app-ml',
  templateUrl: './ml.component.html',
  styleUrls: ['./ml.component.css']
})
export class MlComponent implements OnInit {

  sites: Site[] = [];
  selectedSiteId: number | null = null;
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;

  activeTab: 'predict' | 'explain' | 'features' | 'health' = 'predict';

  costPrediction: MlPrediction | null = null;
  riskPrediction: MlPrediction | null = null;
  costExplanation: MlExplanation | null = null;
  riskExplanation: MlExplanation | null = null;
  healthData: MlHealth | null = null;
  features: MlFeature[] = [];

  loading = false;
  errorMessage = '';
  successMessage = '';
  selectedFile: File | null = null;

  constructor(
    private mlService: MlService,
    private siteService: SiteService
  ) {}

  ngOnInit(): void {
    this.siteService.getAll().subscribe({
      next: (data) => this.sites = data,
      error: (err) => console.error(err)
    });
    this.loadHealth();
  }

  loadHealth(): void {
    this.mlService.health().subscribe({
      next: (data) => this.healthData = data,
      error: (err) => console.error(err)
    });
  }

  train(): void {
    this.loading = true;
    this.clearMessages();
    this.mlService.train().subscribe({
      next: () => { this.successMessage = 'Model training started successfully'; this.loading = false; this.loadHealth(); },
      error: (err) => { this.errorMessage = 'Training failed'; this.loading = false; console.error(err); }
    });
  }

  predictCost(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.clearMessages();
    this.mlService.predictCost(this.selectedSiteId, this.selectedYear, this.selectedMonth).subscribe({
      next: (data) => { this.costPrediction = this.normalizePrediction(data); this.loading = false; },
      error: (err) => { this.errorMessage = 'Cost prediction failed'; this.loading = false; console.error(err); }
    });
  }

  predictRisk(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.clearMessages();
    this.mlService.predictRisk(this.selectedSiteId, this.selectedYear, this.selectedMonth).subscribe({
      next: (data) => { this.riskPrediction = this.normalizePrediction(data); this.loading = false; },
      error: (err) => { this.errorMessage = 'Risk prediction failed'; this.loading = false; console.error(err); }
    });
  }

  explainCost(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.clearMessages();
    this.mlService.explainCost(this.selectedSiteId, this.selectedYear, this.selectedMonth).subscribe({
      next: (data) => { this.costExplanation = this.normalizeExplanation(data); this.loading = false; },
      error: (err) => { this.errorMessage = 'Cost explanation failed'; this.loading = false; console.error(err); }
    });
  }

  explainRisk(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.clearMessages();
    this.mlService.explainRisk(this.selectedSiteId, this.selectedYear, this.selectedMonth).subscribe({
      next: (data) => { this.riskExplanation = this.normalizeExplanation(data); this.loading = false; },
      error: (err) => { this.errorMessage = 'Risk explanation failed'; this.loading = false; console.error(err); }
    });
  }

  loadFeatures(): void {
    this.loading = true;
    this.clearMessages();
    if (this.selectedSiteId) {
      this.mlService.getFeaturesBySite(this.selectedSiteId).subscribe({
        next: (data) => { this.features = data; this.loading = false; },
        error: (err) => { this.errorMessage = 'Failed to load features'; this.loading = false; console.error(err); }
      });
    } else {
      this.mlService.getAllFeatures().subscribe({
        next: (data) => { this.features = data; this.loading = false; },
        error: (err) => { this.errorMessage = 'Failed to load features'; this.loading = false; console.error(err); }
      });
    }
  }

  computeFeatures(): void {
    this.loading = true;
    this.clearMessages();
    this.mlService.computeFeatures(this.selectedYear, this.selectedMonth).subscribe({
      next: () => { this.successMessage = 'Features computed'; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to compute features'; this.loading = false; console.error(err); }
    });
  }

  backfillTargets(): void {
    this.loading = true;
    this.clearMessages();
    this.mlService.backfillTargets().subscribe({
      next: () => { this.successMessage = 'Targets backfilled'; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to backfill targets'; this.loading = false; console.error(err); }
    });
  }

  enrichMarketPrices(): void {
    this.loading = true;
    this.clearMessages();
    this.mlService.enrichMarketPrices().subscribe({
      next: () => { this.successMessage = 'Market prices enriched'; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to enrich market prices'; this.loading = false; console.error(err); }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  importFeaturesCsv(): void {
    if (!this.selectedFile) return;
    this.loading = true;
    this.clearMessages();
    this.mlService.importFeaturesCsv(this.selectedFile).subscribe({
      next: () => { this.successMessage = 'Features CSV imported'; this.loading = false; this.selectedFile = null; },
      error: (err) => { this.errorMessage = 'Failed to import CSV'; this.loading = false; console.error(err); }
    });
  }

  getShapEntries(shapValues: { [key: string]: number } | undefined): [string, number][] {
    if (!shapValues) return [];
    return Object.entries(shapValues).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  }

  getObjectEntries(obj: any): [string, any][] {
    if (!obj) return [];
    return Object.entries(obj).filter(([_, v]) => v != null && typeof v !== 'object');
  }

  private normalizePrediction(data: any): MlPrediction {
    return {
      siteId: data.siteId ?? data.site_id,
      year: data.year,
      month: data.month,
      predictedValue: data.predictedValue ?? data.predicted_value ?? data.prediction ?? data.value,
      confidence: data.confidence ?? data.score,
      modelVersion: data.modelVersion ?? data.model_version,
      features: data.features
    };
  }

  private normalizeExplanation(data: any): MlExplanation {
    return {
      siteId: data.siteId ?? data.site_id,
      year: data.year,
      month: data.month,
      predictedValue: data.predictedValue ?? data.predicted_value ?? data.prediction ?? data.value,
      baseValue: data.baseValue ?? data.base_value,
      shapValues: data.shapValues ?? data.shap_values ?? data.shapvalues,
      topFeatures: data.topFeatures ?? data.top_features
    };
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
