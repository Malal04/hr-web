import { DepartementStatus } from "../_enum/departement";

export interface Departement {
    Id: number;
    Nom: string;
    Code: string;
    Description: string;
    Status: DepartementStatus;
    ContactEmail: string;
    ContactPhone: string;
    Location: string;
    Budget: number;
    EmployeeCount: number;
    DateCreation: Date;
    DateModification: Date;
    IsDeleted: boolean;
}

export interface DepartementStatusDto {
    Nom: string;
    Code: string;
    Description: string;
    Status: DepartementStatus;
    ContactEmail: string;
    ContactPhone: string;
    Location: string;
    Budget: number;
    IsDeleted: boolean;
}

export interface DepartementDto {
    id: number;
    nom: string;
    code: string;
    description?: string;
    status: DepartementStatus;
    contactEmail?: string;
    contactPhone?: string;
    location?: string;
    budget?: number;
    employeeCount?: number;
    dateCreation?: string;
    dateModification?: string | null;
    isDeleted?: boolean;
    managerNom?: string;
}