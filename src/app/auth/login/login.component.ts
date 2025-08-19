import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Login } from '../../_interface/user';
import { AuthService } from '../../_service/auth.service';
import { TokenService } from '../../_service/token.service';
import { Router } from '@angular/router';
import { Role } from '../../_enum/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: Login[] = [];
  loginForm!: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder , 
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log("response login", response);
  
          // Sauvegarde des tokens
          this.tokenService.setToken(response.accessToken);
          this.tokenService.setRefreshToken(response.refreshToken);
  
          // Sauvegarde du rôle
          if (response.role) {
            this.tokenService.setRole(response.role);
          }
  
          // Redirection selon le rôle
          if (response.role === Role.Admin) {
            this.router.navigate(['admin']);
          } else if (response.role === Role.Manager) {
            this.router.navigate(['manager/menu']);
          } else {
            this.router.navigate(['manager/menu']);
          }
          
        },
        error: () => {
          this.message = 'Login ou mot de passe incorrect';
          setTimeout(() => this.message = '', 3000);
        }
      });
    }
  }

}
