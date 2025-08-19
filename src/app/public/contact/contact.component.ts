import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
  });

     constructor(
        private router: Router
      ) { }
  
    // form = new FormGroup({
    //   password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    //   confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    // });
  
    onSubmit() {
      this.router.navigate(['/login']);
    }

}
