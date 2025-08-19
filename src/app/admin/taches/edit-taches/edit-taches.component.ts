import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Employe } from '../../../_interface/employe';
import { PriorityEtat, TacheEtat } from '../../../_enum/taches';
import { TacheService } from '../../../_service/tache.service';
import { EmployeService } from '../../../_service/employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TacheDto } from '../../../_interface/taches';

@Component({
  selector: 'app-edit-taches',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-taches.component.html',
  styleUrl: './edit-taches.component.css'
})
export class EditTachesComponent {
  tacheForm!: FormGroup;
  employes: Employe[] = [];
  message = '';
  tacheId!: number;

  PriorityEtat = PriorityEtat; 
  TacheEtat = TacheEtat; 

  constructor(
    private fb: FormBuilder,
    private tacheService: TacheService,
    private employeService: EmployeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tacheId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.tacheId) {
      this.router.navigate(['/admin/taches/listes']);
      return;
    }

    this.tacheForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      dateLimite: ['', Validators.required],
      priority: [PriorityEtat.Basse, Validators.required],
      etat: [TacheEtat.EN_COURS, Validators.required],
      assigneAId: [null, Validators.required]
    });

    this.loadEmployes();
    this.loadTache();
  }

  loadEmployes(): void {
    this.employeService.getAllEmployees().subscribe({
      next: (res) => this.employes = res ?? [],
      error: (err) => {
        console.error('Employés - erreur', err);
        this.message = 'Erreur de chargement des employés.';
      }
    });
  }

  loadTache(): void {
    this.tacheService.getTacheById(this.tacheId).subscribe({
      next: (tache) => {
        const dateLimite = tache.dateLimite instanceof Date 
        ? tache.dateLimite.toISOString().split('T')[0] 
        : new Date(tache.dateLimite).toISOString().split('T')[0];
        this.tacheForm.patchValue({
          titre: tache.titre,
          description: tache.description,
          dateLimite: dateLimite, 
          priority: tache.priority,
          etat: tache.etat,
          assigneAId: tache.assigneAId
        });
      },
      error: (err) => {
        console.error('Erreur chargement tâche', err);
        this.message = 'Impossible de charger la tâche.';
      }
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
      dateLimite: new Date(fv.dateLimite).toISOString(),
      etat: fv.etat,
      priority: fv.priority,
      assigneAId: Number(fv.assigneAId)
    };

    this.tacheService.updateTache(this.tacheId, payload).subscribe({
      next: () => {
        this.router.navigate(['/admin/taches/listes']);
      },
      error: (err) => {
        console.error('Erreur mise à jour tâche', err);
        this.message = 'Erreur lors de la mise à jour de la tâche.';
      }
    });
  }

}
