import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../_service/auth.service';
import { Register } from '../../../_interface/user';
import { AccountState, Role } from '../../../_enum/user';

@Component({
  selector: 'app-add-employer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './add-employer.component.html',
  styleUrl: './add-employer.component.css'
})
export class AddEmployerComponent {
  registerForm!: FormGroup;
  message: string | null = null;
  error: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nomComplete: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      poste: ['', Validators.required],
      dateEmbauche: ['', Validators.required],
      salaire: [0, [Validators.required, Validators.min(0)]],
      login: ['', Validators.required],
      password: ['', Validators.required],
      role: [Role.Employee, Validators.required],
      accountState: [AccountState.ACTIVE, Validators.required],
    });

  }


  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;
    this.message = null;

    const formValue = this.registerForm.value;

    const request: Register = {
      ...formValue,
      role: Number(formValue.role),
    };

    console.log('Données envoyées au backend :', request);

    this.authService.managerRegister(request).subscribe({
      next: (res) => {
        this.message = 'Utilisateur inscrit avec succès !';
        console.log('Réponse backend :', res);
        this.loading = false;
        setTimeout(() => this.router.navigate(['/manager/employes/listes']), 1500);
      },
      error: (err) => {
        this.error = err.error?.message || err.error || 'Erreur lors de l’inscription.';
        console.error('Erreur inscription :', err);
        this.loading = false;
      }
    });
  }
}
