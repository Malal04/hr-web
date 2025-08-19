import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementService } from '../../../_service/departement.service';
import { DepartementStatus } from '../../../_enum/user';
import { Departement, DepartementDto } from '../../../_interface/departement';

@Component({
  selector: 'app-edit-depart',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-depart.component.html',
  styleUrl: './edit-depart.component.css'
})
export class EditDepartComponent {
  departementForm!: FormGroup;
  departementId!: number;
  isLoading = true;
  message: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departementService: DepartementService
  ) {}

  ngOnInit(): void {
    this.departementId = Number(this.route.snapshot.paramMap.get('id'));

    this.departementForm = this.fb.group({
      nom: ['', Validators.required],
      code: ['', Validators.required],
      description: [''],
      contactEmail: ['', [Validators.email, Validators.required]],
      contactPhone: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(0)]],
      status: [DepartementStatus.Active]
    });

    this.loadDepartement();
  }

  loadDepartement(): void {
    this.isLoading = true;
    this.departementService.getDepartementById(this.departementId).subscribe({
      next: (dep: DepartementDto) => {
        if (dep) {
          this.departementForm.patchValue({
            nom: dep.nom,
            code: dep.code,
            description: dep.description,
            contactEmail: dep.contactEmail,
            contactPhone: dep.contactPhone,
            location: dep.location,
            budget: dep.budget,
            status: dep.status
          });
        }
        this.isLoading = false;
      },
      error: () => {
        this.error = "Impossible de charger le département.";
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.departementForm.invalid) return;

    const dto: DepartementDto = this.departementForm.value;
    console.log('Département envoyé', dto);

    this.departementService.updateDepartement(this.departementId, dto).subscribe({
      next: () => {
        this.message = 'Département mis à jour avec succès !';
        this.error = null;
        setTimeout(() => this.router.navigate(['admin/departements/liste']), 1500);
      },
      error: () => {
        this.error = 'Erreur lors de la mise à jour du département.';
        this.message = null;
      }
    });
  }

}
