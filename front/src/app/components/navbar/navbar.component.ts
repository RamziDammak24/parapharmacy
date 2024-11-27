import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
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
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
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
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

cartPage() {
this.router.navigate(['/cart']);
}
  public name!: string;
  public number: number = 0;

homepage() {
  this.router.navigate(['/']);
}
  products: Product[] = [];
  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortField: string = '';
  showOptions = false;
  LoginState = false;

  constructor(private productService: ProductService
    , private router: Router,
    private userservice: UserService,
    private authService: AuthService,
    private cartService: CartService
  ) { }


  register() {
    this.router.navigate(['/register']);
    this.showOptions = !this.showOptions;
  }
  login() {
    this.router.navigate(['/login']);
    this.showOptions = !this.showOptions;
  }

  ngOnInit() {
    this.name = this.authService.getName();
    this.LoginState = this.authService.checkLoginState();
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
      }
    );
    this.sortOptions = [
      { label: 'Prix décroissant', value: '!price' },
      { label: 'Prix croissant', value: 'price ' },
    ];
  }

  onSortChange(event: any) {
    const value = event.value;
    this.sortOrder = value.startsWith('!') ? -1 : 1;
    this.sortField = value.replace('!', '');
  }

  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }

  logout() {
    this.authService.logout();
    this.PageRefresh();
  }
  PageRefresh() {
    location.reload();
  }
  ngDoCheck() {
    const cart = this.cartService.getCartItems();
    let updatedNumber = 0;
    for (let i = 0; i < cart.length; i++) {
      updatedNumber += cart[i].quantity;
    }
    if (this.number !== updatedNumber) {
      this.number = updatedNumber;
    }
  }
}

