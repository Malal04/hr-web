import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Taches } from '../../../_interface/taches';
import { TacheService } from '../../../_service/tache.service';
import { FormsModule } from '@angular/forms';
import { PriorityEtat, TacheEtat } from '../../../_enum/taches';
import { faPen, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-taches-listes',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './taches-listes.component.html',
  styleUrl: './taches-listes.component.css'
})
export class TachesListesComponent {
  faPen = faPen;
  faTrash = faTrash;
  faCheck = faCheck;
  faTimes = faTimes;
  taches: Taches[] = [];
  loading = false;
  error: string | null = null;

  // Pagination
  page = 1;
  pageSize = 10;
  totalItems = 0;

  // Filtres
  employe = '';
  statut: TacheEtat | null = null;  
  dateLimiteBefore: string | null = null;

  // pour le template (accès à l'enum)
  TacheEtat = TacheEtat;
  PriorityEtat = PriorityEtat;

  constructor(private tacheService: TacheService, private router: Router) {}

  ngOnInit(): void {
    this.loadTaches();
  }

  // loadTaches(): void {
  //   this.loading = true;
  //   this.error = null;

  //   this.tacheService
  //     .getAllTaches(
  //       this.page,
  //       this.pageSize,
  //       this.employe,
  //       this.statut,
  //       this.dateLimiteBefore || undefined
  //     )
  //     .subscribe({
  //       next: (res) => {
  //         console.log( "la listes des taches" ,res);
  //         this.taches = res.items;
  //         this.totalItems = res.totalItems;
         
  //         this.page = res.page + 1;
  //         this.pageSize = res.pageSize;
  //         this.loading = false;
  //       },
  //       error: () => {
  //         this.error = 'Erreur lors du chargement des tâches.';
  //         this.loading = false;
  //       }
  //     });
  // }

  loadTaches(): void {
    this.loading = true;
    this.error = null;
  
    this.tacheService
      .getAllTaches(
        this.page,
        this.pageSize,
        this.employe,
        this.statut,
        this.dateLimiteBefore || undefined
      )
      .subscribe({
        next: (res) => {
          console.log("la listes des taches", res);
  
          // Tri personnalisé : En cours -> Terminées -> Annulées
          this.taches = res.items.sort((a, b) => {
            const ordre = {
              [TacheEtat.EN_COURS]: 1,
              [TacheEtat.TERMINE]: 2,
              [TacheEtat.ANNULEE]: 3
            };
            return ordre[a.etat] - ordre[b.etat];
          });
  
          this.totalItems = res.totalItems;
          this.page = res.page + 1;
          this.pageSize = res.pageSize;
          this.loading = false;
        },
        error: () => {
          this.error = 'Erreur lors du chargement des tâches.';
          this.loading = false;
        }
      });
  }
  

  // Pagination
  nextPage() {
    if (this.page * this.pageSize < this.totalItems) {
      this.page++;
      this.loadTaches();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadTaches();
    }
  }

  // Recherche
  rechercher() {
    this.page = 1;
    this.loadTaches();
  }

  editTache(id: number) {
    this.router.navigate(['/admin/taches/edit', id]);
  }

  // Actions
  terminer(id: number) {
    if (!confirm('Marquer cette tâche comme terminée ?')) return;
    this.page = 1;
    this.loadTaches();
    this.tacheService.terminerTache(id).subscribe({
      next: () => this.loadTaches(),
      error: () => alert('Erreur lors de la mise à jour.')
    });
  }

  annuler(id: number) {
    if (!confirm('Annuler cette tâche ?')) return;
    this.page = 1;
    this.loadTaches();
    this.tacheService.annulerTache(id).subscribe({
      next: () => this.loadTaches(),
      error: () => alert('Erreur lors de la mise à jour.')
    });
  }

  supprimer(id: number) {
    if (!confirm('Supprimer définitivement cette tâche ?')) return;
    this.page = 1;
    this.loadTaches();
    this.tacheService.deleteTache(id).subscribe({
      next: () => this.loadTaches(),
      error: () => alert('Erreur lors de la suppression.')
    });
  }

}
