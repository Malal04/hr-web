import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reussite',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reussite.component.html',
  styleUrl: './reussite.component.css'
})
export class ReussiteComponent {

   constructor(
      private router: Router
    ) { }

  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  onSubmit() {
    this.router.navigate(['/login']);
  }
}
