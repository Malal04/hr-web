import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TacheService } from '../../../_service/tache.service';
import { EmployeService } from '../../../_service/employe.service';
import { Employe } from '../../../_interface/employe';
import { PriorityEtat, TacheEtat } from '../../../_enum/taches';
import { TacheDto } from '../../../_interface/taches';

@Component({
  selector: 'app-add-taches',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './add-taches.component.html',
  styleUrl: './add-taches.component.css'
})
export class AddTachesComponent {
 tacheForm!: FormGroup;
  employes: Employe[] = [];
  message = '';

  PriorityEtat = PriorityEtat; 
  TacheEtat = TacheEtat; 

  constructor(
    private fb: FormBuilder,
    private tacheService: TacheService,
    private employeService: EmployeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0]; // yyyy-MM-dd pour <input type="date">

    this.tacheForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      dateLimite: [today, Validators.required],        // format champ date
      priority: [PriorityEtat.Basse, Validators.required],
      etat: [TacheEtat.EN_COURS, Validators.required],
      assigneAId: [null, Validators.required]
    });

    this.loadEmployes();
  }

  loadEmployes(): void {
    this.employeService.getAllEmployees().subscribe({
      next: (res) => { this.employes = res ?? []; },
      error: (err) => { console.error('Employés - erreur', err); this.message = 'Erreur de chargement des employés.'; }
    });
  }

  onSubmit(): void {
    this.message = '';
    if (this.tacheForm.invalid) {
      this.tacheForm.markAllAsTouched();
      this.message = 'Veuillez remplir tous les champs requis.';
      return;
    }

    const fv = this.tacheForm.value;

    const payload: TacheDto = {
      titre: fv.titre,
      description: fv.description,
      dateLimite: new Date(fv.dateLimite).toISOString(), // ISO attendu par l’API
      etat: fv.etat,
      priority: fv.priority,
      assigneAId: Number(fv.assigneAId)
    };

    this.tacheService.createTache(payload).subscribe({
      next: (tache) => {
        console.log('Tâche créée', tache);
        this.router.navigate(['/admin/taches/listes']);
      },
      error: (err) => {
        console.error('Erreur création tâche', err);
        this.message = 'Erreur lors de la création de la tâche (400 probable : champs invalides).';
      }
    });
  }

}
