import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { DepartementDto } from '../../../_interface/departement';
import { DepartementService } from '../../../_service/departement.service';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DepartementStatus } from '../../../_enum/user';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule, 
  ],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.css'
})
export class ListeComponent {
  faPen = faPen;  
  faTrash = faTrash;
  departements: DepartementDto[] = [];
  page = 1;
  pageSize = 10;
  totalPages = 1;
  loading = false;
  error = '';
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  DepartementStatus = DepartementStatus;

  constructor(
    private departementService: DepartementService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDepartements();
  }

  loadDepartements(): void {
    this.loading = true;
    this.error = '';
    this.departementService.getAllDepartements(this.page, this.pageSize).subscribe({
      next: (data) => {
        console.log("Liste des départements", data);
        this.departements = data.items;
        this.totalPages = Math.ceil(data.totalItems / this.pageSize);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des départements.';
        this.loading = false;
      }
    });
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadDepartements();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadDepartements();
    }
  }

  editDepartement(dept: DepartementDto): void {
    console.log('Modifier département :', dept);
    this.router.navigate(['admin/departements/edit', dept.id]);
  }

  deleteDepartement(dept: DepartementDto): void {
    if (confirm(`Voulez-vous vraiment supprimer le département "${dept.nom}" ?`)) {
      this.departementService.deleteDepartement(dept.id).subscribe({
        next: () => this.loadDepartements(),
        error: () => this.error = 'Impossible de supprimer le département.'
      });
    }
  }
 
 toggleStatus(emp: DepartementDto): void {
    const newStatus = emp.status === DepartementStatus.Active ? DepartementStatus.Archived : DepartementStatus.Active;
    this.departementService.changeDepartementStatus(emp.id, newStatus).subscribe({
      next: () => emp.status = newStatus,
      error: () => this.error = 'Impossible de changer le statut.'
    });
  }
  
}
