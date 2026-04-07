import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Site } from 'src/app/models/site';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {

  sites: Site[] = [];
  loading = true;
  errorMessage = '';

  constructor(private siteService: SiteService, private router: Router) {}

  ngOnInit(): void {
    this.loadSites();
  }

  loadSites(): void {
    this.loading = true;
    this.siteService.getAll().subscribe({
      next: (data) => {
        this.sites = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load sites';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteSite(id: number): void {
    if (!confirm('Are you sure you want to delete this site?')) return;

    this.siteService.delete(id).subscribe({
      next: () => this.loadSites(),
      error: (err) => {
        this.errorMessage = 'Failed to delete site';
        console.error(err);
      }
    });
  }

  goToCreate(): void {
    this.router.navigate(['/sites/create']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/sites/edit', id]);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/sites', id]);
  }
}
