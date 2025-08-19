import { AccountState, Role } from "../_enum/user";

export interface Employe {
    id: number;
    nomComplete: string;
    email: string;
    phoneNumber: string;
    poste: string;
    dateEmbauche: string;
    salaire: number;
    login: string;
    password: string;
    accountState: AccountState;
    role: Role;
    departementId: number;

    departementNom: string;
    departementCode: string;
    departementLocation: string;
}

export interface EmployeDto {
    id: number;
    nomComplete: string;
    email: string;
    phoneNumber: string;
    poste: string;
    dateEmbauche: string;
    salaire: number;
    login: string;
    accountState: AccountState;
    role: Role;
    departementId: number;
}
