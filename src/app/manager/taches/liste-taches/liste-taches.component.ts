import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { faPen, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Taches } from '../../../_interface/taches';
import { PriorityEtat, TacheEtat } from '../../../_enum/taches';
import { TacheService } from '../../../_service/tache.service';
import { UserProfile, UserService } from '../../../_service/user.service';
import { Role } from '../../../_enum/user';

@Component({
  selector: 'app-liste-taches',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './liste-taches.component.html',
  styleUrl: './liste-taches.component.css'
})
export class ListeTachesComponent {
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
  canManageUsers: boolean = false;
  profile?: UserProfile;

  constructor(
    private tacheService: TacheService, 
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadTaches();
    this.getUserSession();
  }


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

    getUserSession(): void {
      this.userService.getAllProfile().subscribe({
        next: (data) => {
          console.log("Profil utilisateur récupéré", data);
          this.profile = data;
          this.canManageUsers = this.profile.role === Role.Admin || this.profile.role === Role.Manager;
        },
        error: (err) => {
          console.error(err);
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
    this.router.navigate(['manager/taches/edit', id]);
  }

  terminer(id: number): void {
    if (!confirm('Marquer cette tâche comme terminée ?')) return;
    this.tacheService.terminerTache(id).subscribe({
      next: (res) => {
        // ✅ Mise à jour directe du tableau
        const index = this.taches.findIndex(t => t.id === id);
        if (index !== -1) {
          this.taches[index].etat = TacheEtat.TERMINE;
        }
        // ✅ Ou recharger toute la liste avec tri appliqué
        this.loadTaches();
      },
      error: (err) => {
        console.error('Erreur lors de la terminaison', err);
      }
    });
  }
  

  annuler(id: number) {
    if (!confirm('Annuler cette tâche ?')) return;
    this.tacheService.annulerTache(id).subscribe({
      next: (res) => {
        // ✅ Mise à jour directe du tableau
        const index = this.taches.findIndex(t => t.id === id);
        if (index !== -1) {
          this.taches[index].etat = TacheEtat.ANNULEE;
        }
        // ✅ Ou recharger toute la liste avec tri appliqué
        this.loadTaches();
      },
      error: (err) => {
        console.error('Erreur lors de l\'annulation', err);
      }
    });
  }

  supprimer(id: number) {
    if (!confirm('Supprimer définitivement cette tâche ?')) return;
    this.tacheService.deleteTache(id).subscribe({
      next: (res) => {
        // ✅ Mise à jour directe du tableau
        const index = this.taches.findIndex(t => t.id === id);
        if (index !== -1) {
          this.taches.splice(index, 1);
        }
        // ✅ Ou recharger toute la liste avec tri appliqué
        this.loadTaches();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
      }
    });
  }

}
