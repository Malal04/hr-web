import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PriorityEtat, TacheEtat } from '../../_enum/taches';
import { UserProfile, UserService } from '../../_service/user.service';
import { Taches } from '../../_interface/taches';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { TacheService } from '../../_service/tache.service';
import { Role } from '../../_enum/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
 profile?: UserProfile;
  dernieresTaches: Taches[] = [];
  canManageUsers: boolean = false;
  faLock = faLock;

  constructor(
    private tacheService: TacheService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserSession();
    this.loadStats();
  }

  loadStats(): void {
    this.tacheService.getAllTaches(1, 100).subscribe(t => {
      this.dernieresTaches = t.items.slice(0, 30);
    });
  }

  getUserSession(): void {
    this.userService.getAllProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.canManageUsers = this.profile.role === Role.Admin || this.profile.role === Role.Manager;
      },
      error: (err) => console.error(err)
    });
  }

  // ✅ Mapper enums vers texte
  getEtatLabel(etat: TacheEtat): string {
    switch (etat) {
      case TacheEtat.EN_COURS: return 'En cours';
      case TacheEtat.TERMINE: return 'Terminé';
      case TacheEtat.ANNULEE: return 'Annulée';
      default: return 'Inconnu';
    }
  }

  getPriorityLabel(priority: PriorityEtat): string {
    switch (priority) {
      case PriorityEtat.Basse: return 'Basse';
      case PriorityEtat.Moyenne: return 'Moyenne';
      case PriorityEtat.Haute: return 'Haute';
      case PriorityEtat.Urgente: return 'Urgente';
      default: return 'Non défini';
    }
  }

}
