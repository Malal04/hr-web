import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { EmployeService } from '../../../_service/employe.service';
import { Employe } from '../../../_interface/employe';
import { faPen, faTrash, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { AccountState } from '../../../_enum/user';

@Component({
  selector: 'app-index-employer',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './index-employer.component.html',
  styleUrl: './index-employer.component.css'
})
export class IndexEmployerComponent {
  faPen = faPen;  
  faTrash = faTrash;
  employees: Employe[] = [];
  loading = false;
  error: string | null = null;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  AccountState = AccountState;  

  constructor(
    private employerService: EmployeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.loading = true;
    this.error = null;
    this.employerService.getAllEmployees().subscribe({
      next: (data) => {
        console.log("Liste des employés", data);
        this.employees = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error || 'Erreur lors du chargement des employés.';
        this.loading = false;
      }
    });
  }

  deleteEmployee(emp: Employe): void {
    if (confirm(`Voulez-vous supprimer l'employé "${emp.nomComplete}" ?`)) {
      this.employerService.deleteEmploye(emp.id).subscribe({
        next: () => this.fetchEmployees(),
        error: () => this.error = 'Impossible de supprimer l’employé.'
      });
    }
  }

  editEmployee(emp: Employe): void {
    console.log('Éditer', emp);
    this.router.navigate(['manager/employes/edit', emp.id]);
  }

  toggleStatus(emp: Employe): void {
    const newStatus = emp.accountState === AccountState.ACTIVE ? AccountState.BLOCKED : AccountState.ACTIVE;
    this.employerService.changeEmployeeStatus(emp.id, newStatus).subscribe({
      next: () => emp.accountState = newStatus,
      error: () => this.error = 'Impossible de changer le statut.'
    });
  }
}
