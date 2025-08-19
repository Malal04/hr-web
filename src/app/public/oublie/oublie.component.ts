import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oublie',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './oublie.component.html',
  styleUrl: './oublie.component.css'
})
export class OublieComponent {

  message: string | null = null;

  constructor(
    private router: Router
  ) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    this.router.navigate(['public/reussite']);
  }

}
