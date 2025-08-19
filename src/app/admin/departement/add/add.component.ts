import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DepartementService } from '../../../_service/departement.service';
import { DepartementStatusDto } from '../../../_interface/departement';
import { DepartementStatus } from '../../../_enum/departement';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  departementForm!: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private departementService: DepartementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.departementForm = this.fb.group({
      nom: ['', Validators.required],
      code: ['', Validators.required],
      description: [''],
      contactEmail: ['', [Validators.email, Validators.required]],
      contactPhone: ['', [Validators.required, Validators.minLength(10)]],
      location: ['' , Validators.required],
      budget: [0, [Validators.min(0)]],
      status: [DepartementStatus.Active] 
    });
  }

  onSubmit(): void {
    if (this.departementForm.invalid) {
      this.message = 'Veuillez remplir correctement le formulaire.';
      return;
    }

    const dto: DepartementStatusDto = this.departementForm.value;

    console.log('DepartementDto', dto);

    this.departementService.createDepartement(dto).subscribe({
      next: () => {
        this.message = 'Département créé avec succès !';
        setTimeout(() => this.router.navigate(['admin/departements/liste']), 1500);
      },
      error: () => {
        this.message = 'Erreur lors de la création du département.';
      }
    });
  }

}
