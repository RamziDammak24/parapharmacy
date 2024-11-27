import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
export const routes: Routes = [
    {
        path: '',
        component: ProductsListComponent

    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'cart',
        component: CartComponent
    }
];
