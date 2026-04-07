import { CategorieEquipement } from './categorie-equipement';
import { Site } from './site';

export enum StatusEquipement {
  OUTOFSERVICE = 'OUTOFSERVICE',
  ACTIF = 'ACTIF',
  SUSPENDUE = 'SUSPENDUE'
}

export interface Equipement {
  idEquipement?: number;
  nomEquipement: string;
  refEquipement: string;
  statusEquipement: StatusEquipement;
  serialNumber: string;
  categorie?: CategorieEquipement;
  site?: Site;
}
