import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faMoneyBill, faEye, faArrowRight, faBed, faUser, faDollarSign, faBuilding, faUsers, faTasks, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Taches } from '../../_interface/taches';
import { DepartementService } from '../../_service/departement.service';
import { EmployeService } from '../../_service/employe.service';
import { TacheService } from '../../_service/tache.service';
import { TacheEtat } from '../../_enum/taches';
import { ActivityLogService } from '../../_service/activity-log.service';
import { ActivityLog } from '../../_interface/paginated-list';
import { UserProfile, UserService } from '../../_service/user.service';
import { TokenService } from '../../_service/token.service';
import { Role } from '../../_enum/user';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
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

 logs: ActivityLog[] = [];
 recentLogs: ActivityLog[] = [];
 totalLogs: number = 0;
 profile?: UserProfile;
 isAdmin: boolean = false;
 canManageUsers: boolean = false;


 constructor(
   private departementService: DepartementService,
   private employeService: EmployeService,
   private tacheService: TacheService,
   private logService: ActivityLogService,
   private userService: UserService,
   private tokenService: TokenService
 ) {}

 ngOnInit(): void {
   this.loadStats();
   this.loadLogs();
   this.getUserSession();
   this.checkAdmin();
 }

 loadStats(): void {
   this.departementService.getAllDepart().subscribe(d => this.totalDepartements = d.length);
   this.employeService.getAllUsers().subscribe(e => this.totalEmployes = e.length);

   // Pour les tâches, récupérer toutes (ou paginées) et calculer les stats
   this.tacheService.getAllTaches(1, 100).subscribe(t => {
     this.totalTachesEnCours = t.items.filter(x => x.etat === TacheEtat.EN_COURS).length;
     this.totalTachesTerminees = t.items.filter(x => x.etat === TacheEtat.TERMINE).length;
     this.totalTachesAnulees = t.items.filter(x => x.etat === TacheEtat.ANNULEE).length;
     this.dernieresTaches = t.items.slice(0, 30); 
   });
 }

  loadLogs(): void {
    this.logService.getAll().subscribe({
      next: data => {
        console.log("logs ", data);
        this.logs = data.logs.slice(0, 4);
        this.recentLogs = data.logs.slice(0, 4);
        this.totalLogs = data.total;
      },
      error: err => console.error(err)
    });
  }

  deleteLog(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce log ?')) {
      this.logService.delete(id).subscribe(() => {
        this.logs = this.logs.filter(l => l.id !== id);
        this.totalLogs--;
      });
    }
  }

  clearLogs(): void {
    if (confirm('Voulez-vous vraiment vider tous les logs ?')) {
      this.logService.clearAll().subscribe(() => {
        this.logs = [];
        this.totalLogs = 0;
      });
    }
  }

  checkAdmin(): void {
    this.isAdmin = this.tokenService.isAdmin(); 
  }

  getUserSession(): void {
    this.userService.getAllProfile().subscribe({
      next: (data) => {
        console.log("Profil utilisateur récupéré", data);
        this.profile = data; // ✅ pas un tableau
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
 

}
