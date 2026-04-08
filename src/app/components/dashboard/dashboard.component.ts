import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.service';
import { EquipmentRulService } from 'src/app/services/equipment-rul.service';
import { IncidentService } from 'src/app/services/incident.service';
import { EquipementService } from 'src/app/services/equipement.service';
import { Site } from 'src/app/models/site';
import { EquipmentRul } from 'src/app/models/equipment-rul';
import { Incident } from 'src/app/models/incident';
import { Equipement } from 'src/app/models/equipement';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sites: Site[] = [];
  equipements: Equipement[] = [];
  highRiskEquipment: EquipmentRul[] = [];
  recentIncidents: Incident[] = [];

  totalSites = 0;
  activeSites = 0;
  totalEquipements = 0;
  activeEquipements = 0;
  totalIncidents = 0;
  openIncidents = 0;
  highRiskCount = 0;

  loading = true;

  constructor(
    private siteService: SiteService,
    private equipementService: EquipementService,
    private rulService: EquipmentRulService,
    private incidentService: IncidentService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.siteService.getAll().subscribe({
      next: (data) => {
        this.sites = data;
        this.totalSites = data.length;
        this.activeSites = data.filter(s => s.statusSites === 'ACTIF').length;
        this.loadIncidentsForSites(data);
      },
      error: () => this.loading = false
    });

    this.equipementService.getAll().subscribe({
      next: (data) => {
        this.equipements = data;
        this.totalEquipements = data.length;
        this.activeEquipements = data.filter(e => e.statusEquipement === 'ACTIF').length;
      }
    });

    this.rulService.getHighRiskEquipment().subscribe({
      next: (data) => {
        this.highRiskEquipment = data;
        this.highRiskCount = data.length;
      }
    });
  }

  private loadIncidentsForSites(sites: Site[]): void {
    let allIncidents: Incident[] = [];
    let loaded = 0;
    if (sites.length === 0) { this.loading = false; return; }

    sites.forEach(site => {
      if (site.idSite) {
        this.siteService.getIncidentsBySite(site.idSite).subscribe({
          next: (incidents) => {
            allIncidents = [...allIncidents, ...incidents];
            loaded++;
            if (loaded >= sites.length) {
              this.recentIncidents = allIncidents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);
              this.totalIncidents = allIncidents.length;
              this.openIncidents = allIncidents.filter(i => i.etatIncident === 'OPEN').length;
              this.loading = false;
            }
          },
          error: () => {
            loaded++;
            if (loaded >= sites.length) this.loading = false;
          }
        });
      } else {
        loaded++;
        if (loaded >= sites.length) this.loading = false;
      }
    });
  }

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'CRITICAL': return 'badge-danger';
      case 'HIGH': return 'badge-warning';
      case 'MEDIUM': return 'badge-info';
      case 'LOW': return 'badge-success';
      default: return '';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ACTIF': return 'badge-active';
      case 'SUSPENDUE': return 'badge-inactive';
      case 'FERME': return 'badge-maintenance';
      default: return '';
    }
  }

  getRulClass(category: string): string {
    switch (category) {
      case 'RUL_LONG': return 'badge-success';
      case 'RUL_MEDIUM': return 'badge-warning';
      case 'RUL_SHORT': return 'badge-danger';
      default: return '';
    }
  }
}
