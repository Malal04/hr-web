import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faMoneyBill, faEye, faArrowRight, faBed, faUser, faDollarSign, faBuilding, faUsers, faTasks, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Taches } from '../../_interface/taches';
import { TacheEtat } from '../../_enum/taches';
import { EmployeService } from '../../_service/employe.service';
import { TacheService } from '../../_service/tache.service';
import { UserProfile, UserService } from '../../_service/user.service';
import { Role } from '../../_enum/user';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
 // FontAwesome Icons
  faEdit = faEdit;
  faEye = faEye;
  faArrowRight = faArrowRight;
  faBed = faBed;
  faUser = faUser;
  faMoneyBill = faMoneyBill;
  faDollarSign = faDollarSign;
  faBuilding = faBuilding;
  faUsers = faUsers;
  faTasks = faTasks;
  faCheckCircle = faCheckCircle;
  message: string = '';
  error?: string;
  
  // Statistiques
  totalDepartements: number = 0;
  totalEmployes: number = 0;
  totalTachesEnCours: number = 0;
  totalTachesTerminees: number = 0;
  totalTachesAnulees: number = 0;
 
  // Dernières tâches
  dernieresTaches: Taches[] = [];
  TacheEtat = TacheEtat;
  profile?: UserProfile;
  isAdmin: boolean = false;
  canManageUsers: boolean = false;
 
 
  constructor(
    private employeService: EmployeService,
    private tacheService: TacheService,
    private userService: UserService,
  ) {}
 
  ngOnInit(): void {
    this.loadStats();
    this.getUserSession();
  }
 
  loadStats(): void {
    this.employeService.getAllEmployees().subscribe(e => this.totalEmployes = e.length);
    this.tacheService.getAllTaches(1, 100).subscribe(t => {
      this.totalTachesEnCours = t.items.filter(x => x.etat === TacheEtat.EN_COURS).length;
      this.totalTachesTerminees = t.items.filter(x => x.etat === TacheEtat.TERMINE).length;
      this.totalTachesAnulees = t.items.filter(x => x.etat === TacheEtat.ANNULEE).length;
      this.dernieresTaches = t.items.slice(0, 30); 
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
 
}
