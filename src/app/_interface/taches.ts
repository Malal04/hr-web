import { PriorityEtat, TacheEtat } from "../_enum/taches";

export interface Taches {
  id: number;
  titre: string;
  description: string;
  dateLimite: Date;
  etat: TacheEtat;
  priority: PriorityEtat;
  dateCreation: Date;
  dateModification: Date;
  assigneAId: number;
  assigneANom: string;
  creeParId: number;
  creeParNom: string;
  nomDepart: string;
}

export interface TacheDto {
  id?: number;
  titre: string;
  description: string;
  dateLimite: string;          
  etat: TacheEtat;
  priority: PriorityEtat;
  assigneAId: number;

}