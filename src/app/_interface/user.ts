import { AccountState, Role } from "../_enum/user";

export interface UserDtos {
    Id: number;
    NomComplete: string;
    Email: string;
    PhoneNumber: string;
    Poste: string;
    DateEmbauche: Date;
    Salaire: number;
    AccountState: AccountState;
    Login: string;
    Password: string;
    Role: Role;
    DepartementId: number;
}

export interface Login {
    Login: string;
    Password: string;
}

export interface Register {
    NomComplete: string;
    Email: string;
    PhoneNumber: string;
    Poste: string;
    DateEmbauche: Date;
    Salaire: number;
    AccountState: AccountState;
    Login: string;
    Password: string;
    Role: Role;
    DepartementId: number;
}

