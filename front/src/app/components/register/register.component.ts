import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';  // Import Message from primeng/api
import { ProductService } from '../../services/product.service';  // Assuming this service is required for other logic
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../classes/User';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MessagesModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    DataViewModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    CommonModule,
    PickListModule,
    OrderListModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  messages: Message[] = [];

  constructor(
              private router: Router, 
              private formBuilder: FormBuilder,
              private userService: UserService) {
                this.registerForm = this.formBuilder.group({
                  email: ['', [Validators.required, Validators.email]],
                  password: ['', Validators.required],
                  confirmPassword: ['', Validators.required],
                  firstName: ['', Validators.required],
                  name: ['', Validators.required], 
                  birthdate: ['', Validators.required] 
                });                
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.messages = [];
      if (this.registerForm.get('firstName')?.hasError('required')) {
        this.messages = [];
        this.messages.push({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Le nom est requis.'
        });
        return;
      }
  
      if (this.registerForm.get('name')?.hasError('required')) {
        this.messages = [];
        this.messages.push({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Le prénom est requis.'
        }); 
        return;
      }

      if (this.registerForm.get('email')?.hasError('required')) {
        this.messages = [];
        this.messages.push({
          severity: 'error',
          summary: 'Erreur',
          detail: 'L\'email est requis.'
        });
        return;
      }
  
      if (this.registerForm.get('email')?.hasError('email')) {
        this.messages = [];
        this.messages.push({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Le format de l\'email est incorrect.'
        });
        return;
      }

  
      if (this.registerForm.get('birthdate')?.hasError('required')) {
        this.messages = [];
        this.messages.push({
          severity: 'error',
          summary: 'Erreur',
          detail: 'La date de naissance est requise.'
        });
        return;
      }

      if (this.registerForm.get('password')?.hasError('required')) {
        this.messages = [];
        this.messages.push({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Le mot de passe est requis.'
        });
        return;
      }
      if (this.registerForm.get('confirmPassword')?.hasError('required')) {
        this.messages = [];
        this.messages.push({
          severity: 'error',
          summary: 'Erreur',
          detail: 'La confirmation du mot de passe est requise.'
        });
        return;
      }
      if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
        this.messages = [];
        this.messages.push({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Les mots de passe ne correspondent pas.'
        });
        return;
      }
    }
    const user = new User();
    user.email = this.registerForm.get('email')?.value;
    user.password = this.registerForm.get('password')?.value;
    user.name = this.registerForm.get('name')?.value;
    user.firstName = this.registerForm.get('firstName')?.value;
    user.dateOfBirth = this.registerForm.get('birthdate')?.value;
    this.userService.addUser(user).subscribe( 
      data => {
        this.messages = [];
        this.messages.push({
          severity: 'success',
          summary: 'Succès',
          detail: 'Inscription réussie. Vous pouvez maintenant vous connecter.'
        });
      },
      error => {
      this.messages = [];
      this.messages.push({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer plus tard.'
      });
      }
    );
  }

  login() {
    this.router.navigate(['/login']);
  }
}
