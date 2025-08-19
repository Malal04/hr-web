import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmployeService } from '../../../_service/employe.service';
import { Employe, EmployeDto } from '../../../_interface/employe';
import { AccountState, Role } from '../../../_enum/user';
import { DepartementService } from '../../../_service/departement.service';
import { DepartementDto } from '../../../_interface/departement';

@Component({
  selector: 'app-edit-employe',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-employe.component.html',
  styleUrl: './edit-employe.component.css'
})
export class EditEmployeComponent {
  registerForm!: FormGroup;
  employeId!: number;
  departements: DepartementDto[] = [];
  isLoading = true;
  message: string | null = null;
  error: string | null = null;
  AccountState = AccountState; 
  Role = Role;

  roles = Object.values(Role).filter(v => typeof v === 'number'); 
  roleLabels = Role;

  accountStates = Object.values(AccountState).filter(v => typeof v === 'number');
  accountStateLabels = AccountState;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeService: EmployeService,
    private departementService: DepartementService,
  ) {}

  ngOnInit(): void {
    this.employeId = Number(this.route.snapshot.paramMap.get('id'));

    this.registerForm = this.fb.group({
      nomComplete: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      poste: ['', Validators.required],
      dateEmbauche: ['', Validators.required],
      salaire: [0, Validators.required],
      login: ['', Validators.required],
      role: ['', Validators.required],
      accountState: ["", Validators.required],
      departementId: [null, Validators.required],
    });

    this.loadDepartements();
    this.loadEmploye();
  }

  // Charger un employé existant
  loadEmploye(): void {
    this.isLoading = true;
    this.employeService.getEmployeeById(this.employeId).subscribe({
      next: (emp: Employe) => {
        console.log("Employé chargé", emp);
        if (emp) {
          this.registerForm.patchValue({
            nomComplete: emp.nomComplete,
            email: emp.email,
            phoneNumber: emp.phoneNumber,
            poste: emp.poste,
            dateEmbauche: emp.dateEmbauche?.split('T')[0], 
            salaire: emp.salaire,
            login: emp.login,
            role: emp.role,
            accountState: emp.accountState,
            departementId: emp.departementId
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Impossible de charger l'employé.";
        this.isLoading = false;
      }
    });
  }

  loadDepartements(): void {
    this.departementService.getAllDepart().subscribe({
      next: (data) => this.departements = data,
      error: () => this.error = "Erreur de chargement des départements."
    });
  }

  // ✅ Mise à jour
  onSubmit(): void {
    if (this.registerForm.invalid) return;

    // Préparer l'objet à envoyer au backend
    const dto: EmployeDto = {
      id: this.employeId,
      nomComplete: this.registerForm.value.nomComplete,
      email: this.registerForm.value.email,
      phoneNumber: this.registerForm.value.phoneNumber,
      poste: this.registerForm.value.poste,
      dateEmbauche: new Date(this.registerForm.value.dateEmbauche).toISOString(), 
      salaire: this.registerForm.value.salaire,
      login: this.registerForm.value.login,
      role: Number(this.registerForm.value.role),
      accountState: Number(this.registerForm.value.accountState),
      departementId: Number(this.registerForm.value.departementId)
    };

    console.log("Employé mis à jour (DTO corrigé)", dto);

    this.employeService.updateEmploye(this.employeId, dto).subscribe({
      next: () => {
        this.message = "Employé mis à jour avec succès ✅";
        this.router.navigate(['/admin/employes/listes']);
      },
      error: (err) => {
        this.error = "Erreur lors de la mise à jour.";
        console.error(err);
      }
    });
  }
}

