import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/Product';
import { ProductService } from '../../services/product.service';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
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
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {


  products: Product[] = [];
  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortField: string = '';
  showOptions = false;

  constructor(private productService: ProductService
    , private router: Router,
    private cartService: CartService	
  ) { }

  DeleteAll() {
    this.cartService.clearCart();
  }

AddToCart(product: Product) {
  if (product.id !== undefined) {
    this.cartService.addToCart(Number(product.id));
  } else {
    console.error('Product ID is undefined');
  }
}
  register() {
    this.router.navigate(['/register']);
  }
  login() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
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
}
