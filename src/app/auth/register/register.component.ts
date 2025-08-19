import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../_service/auth.service';
import { Router } from '@angular/router';
import { AccountState, Role } from '../../_enum/user';
import { Register } from '../../_interface/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;
  message: string | null = null;
  error: string | null = null;
  loading = false;

  roles = [
    { value: Role.Admin, label: 'Administrateur' },
    { value: Role.Manager, label: 'Manager' },
    { value: Role.Employee, label: 'Employé' }
  ];

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
      poste: ['' , Validators.required],
      dateEmbauche: ['' , Validators.required],
      salaire: [0 , [Validators.required, Validators.min(100)]],
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: [Role.Admin, Validators.required],
      accountState: [AccountState.ACTIVE],
      departementId: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.error = 'Veuillez remplir correctement le formulaire.';
      return;
    }
  
    const formValue = this.registerForm.value;
  
    const request: Register = {
      ...formValue,
      role: Number(formValue.role),
      departementId: formValue.departementId ? Number(formValue.departementId) : null
    };
  
    this.loading = true;
    this.error = null;
  
    this.authService.register(request).subscribe({
      next: (res) => {
        this.message = "Utilisateur inscrit avec succès !";
        this.loading = false;
        setTimeout(() => this.router.navigate(['admin/employes/listes']), 1500);
      },
      error: (err) => {
        this.error = err.error || 'Erreur lors de l\'inscription.';
        this.loading = false;
      }
    });
  }

  

}
