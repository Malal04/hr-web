import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokenService } from '../../_service/token.service';
import { faCaretDown, faCocktail, faDoorClosed, faGear, faBed, faUserFriends, faUserPlus, faUser, faCalendarCheck, faHomeAlt, faHotel, faHome, faMoneyBillWave, faBoxOpen, faUtensils, faClipboardCheck, faBowlFood, faRightFromBracket, faGauge, faTachometerAlt, faBuilding, faUsers, faTasks, faSignOutAlt, faList, faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
  ) {}

  ngOnInit(): void {
    this.checkAdmin();
  }

  checkAdmin(): void {
    this.isAdmin = this.tokenService.isAdmin(); 
  }

  onLogout() {
    this.tokenService.logout();
  }

}
