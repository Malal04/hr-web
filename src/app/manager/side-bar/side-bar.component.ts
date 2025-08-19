import { Component, EventEmitter, Output } from '@angular/core';
import { TokenService } from '../../_service/token.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { faCaretDown, faCocktail, faDoorClosed, faGear, faBed, faUserFriends, faUserPlus, faUser, faCalendarCheck, faHomeAlt, faHotel, faHome, faMoneyBillWave, faBoxOpen, faUtensils, faClipboardCheck, faBowlFood, faRightFromBracket, faGauge, faTachometerAlt, faBuilding, faUsers, faSignOutAlt, faTasks, faList, faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { UserProfile, UserService } from '../../_service/user.service';
import { Role } from '../../_enum/user';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule, 
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  faDashboard = faTachometerAlt;
  faDepartments = faBuilding;
  faEmployees = faUsers;
  faTasks = faTasks;
  faUser = faUser;
  faLogout = faSignOutAlt;
  faList = faList;
  faAdd = faPlus;
  faAddUser = faUserPlus;
  faDropdown = faChevronDown;
  canManageUsers: boolean = false;
  profile?: UserProfile;


  @Output() closeSidebar = new EventEmitter<void>();
  isAdmin: boolean = false;

  toggleDropdown(event: Event) {
    const target = (event.currentTarget as HTMLElement).parentElement;
    target?.classList.toggle('open');
  }

  onItemClick() {
    this.closeSidebar.emit();
  }

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.checkAdmin();
    this.getUserSession();
  }

  checkAdmin(): void {
    this.isAdmin = this.tokenService.isAdmin(); 
  }

  onLogout() {
    this.tokenService.logout();
  }

   getUserSession(): void {
      this.userService.getAllProfile().subscribe({
        next: (data) => {
          console.log("Profil utilisateur récupéré", data);
          this.profile = data; // ✅ pas un tableau
          this.canManageUsers = this.profile.role === Role.Admin || this.profile.role === Role.Manager;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
}
