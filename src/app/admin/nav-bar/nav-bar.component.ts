import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../_service/token.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { UserProfile, UserService } from '../../_service/user.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  faMenu = faBars;
  isAdmin: boolean = false;
  message: string = '';
  canManageUsers: boolean = false;
  profile?: UserProfile;
  loading = true;
  errorMsg = '';

  @Output() toggleSidebar = new EventEmitter<void>();

  toggleMenu() {
    this.toggleSidebar.emit();
  }

  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.checkAdmin();
    this.getUserSession();
  }
  
  checkAdmin(): void {
    this.isAdmin = this.tokenService.isAdmin(); 
  }
  
  getUserSession(): void {
    this.userService.getAllProfile().subscribe({
      next: (data) => {
        console.log("Liste des utilisateurs", data);
        this.profile = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Impossible de récupérer le profil.';
        console.error(err);
        this.loading = false;
      }
    });
  }


}
