export enum StatusSites {
  ACTIF = 'ACTIF',
  SUSPENDUE = 'SUSPENDUE',
  FERME = 'FERME'
}

export interface Site {
  idSite?: number;
  codeRef: string;
  nom: string;
  latitude: number;
  longitude: number;
  countryCode: string;
  currencyCode: string;
  statusSites: StatusSites;
}
