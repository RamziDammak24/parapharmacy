import { Component, OnInit } from '@angular/core';
import { Message, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from '../../classes/Product';
import { ProductService } from '../../services/product.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { Router } from '@angular/router';
import { ReactiveFormsModule , FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
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
    OrderListModule,
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  messages: Message[] = [];
  Users: User[] = [];
  constructor(private productService: ProductService
    , private router: Router , 
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) { 
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required , Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  ngOnInit() {
    this.userService.GetUsers().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          this.Users.push(data[i]);
        }
      }
      );
  }

register() {
  this.router.navigate(['/register']);
}
onSubmit() {
  if (this.loginForm.invalid) {
    this.messages = [];
    if (this.loginForm.get('email')?.hasError('required')) {
      this.messages.push({
        severity: 'error',
        summary: 'Erreur',
        detail: 'L\'email est requis.'
      });
      return; 
    }
    if (this.loginForm.get('email')?.hasError('email')) {
      this.messages.push({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Le format de l\'email est incorrect.'
      });
      return; 
    }
    if (this.loginForm.get('password')?.hasError('required')) {
      this.messages = [];
      this.messages.push({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Le mot de passe est requis.'
      });
      return; 
    }
  }
  const user = new User();
  user.email = this.loginForm.get('email')?.value;
  user.password = this.loginForm.get('password')?.value;

  for (let i = 0; i < this.Users.length; i++) {
    if (this.Users[i].email === user.email && this.Users[i].password === user.password) {
      this.authService.login();
      this.authService.setId(this.Users[i].id!);
      this.authService.setName(this.Users[i].name!);
      this.PageRefreshWithNavigate();
      return;
    }
      this.messages = [];
      this.messages.push({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Email ou mot de passe incorrect.'
      });
  }
}    
  PageRefreshWithNavigate() {
    setTimeout(function () {
       window.location.reload();
    }, 0);
    this.router.navigate(['/']);
  }
}