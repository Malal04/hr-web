import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../_service/auth.service';
import { Register } from '../../../_interface/user';
import { AccountState, Role } from '../../../_enum/user';
import { DepartementService } from '../../../_service/departement.service';
import { DepartementDto } from '../../../_interface/departement';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  registerForm!: FormGroup;
  departements: DepartementDto[] = [];
  message: string | null = null;
  error: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private departementService: DepartementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nomComplete: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      poste: ['' , Validators.required],
      dateEmbauche: ['' , Validators.required],
      salaire: [0 , Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      role: [Role.Manager],
      accountState: [AccountState.ACTIVE],
      departementId: [ null, Validators.required],
   });
    this.loadDepartements();
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
  
    const formValue = this.registerForm.value;
  
    // Convertir role et departementId en nombre
    const request: Register = {
      ...formValue,
      role: Number(formValue.role),
      departementId: formValue.departementId ? Number(formValue.departementId) : null
    };
  
    this.loading = true;
    this.error = null;
    console.log("Données de l'utilisateur :", request);
  
    this.authService.register(request).subscribe({
      next: (res) => {
        this.message = "Utilisateur inscrit avec succès !";
        console.log("Utilisateur inscrit :", res);
        this.loading = false;
        setTimeout(() => this.router.navigate(['admin/employes/listes']), 1500);
      },
      error: (err) => {
        this.error = err.error || 'Erreur lors de l’inscription.';
        this.loading = false;
      }
    });
  }
  

  loadDepartements(): void {
    this.loading = true;
    this.error = null;
    this.departementService.getAllDepart().subscribe({
      next: (data) => this.departements = data,
      error: (err) => this.error = err
    });
  }
  

}
