import { Component, EventEmitter, Output } from '@angular/core';
import { TokenService } from '../../_service/token.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserProfile, UserService } from '../../_service/user.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    RouterModule,
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
        console.log("Profil utilisateur récupéré", data);
        this.profile = data; // ✅ pas un tableau
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
