import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/Product';
import { CartService } from '../../services/cart.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { v4 as uuidv4 } from 'uuid';
import { OrderService } from '../../services/order.service';
import { Message } from 'primeng/api';  // Import Message from primeng/api
import { MessagesModule } from 'primeng/messages';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MessagesModule,
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    DataViewModule,
    ButtonModule,
    RatingModule,
    OrderListModule,
    PickListModule,
    MatDialogModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  totalAmount: number = 0;
  products: Product[] = [];
  cartItems: any[] = [];
  CartProductsWithQuantities: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  messages: Message[] = [];

  

  generateComplexId(): string {
    return uuidv4();
  }
  

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  getTotalPrice(): number {
    let total = 0;
    this.CartProductsWithQuantities.value.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(Number(product.id));
    this.updateCart();
    }

  increaseQuantity(product: Product) {
    this.cartService.addToCart(Number(product.id));
    this.updateCart();
  }

  decreaseQuantity(product: Product) {
    this.cartService.DecreaseQuantity(Number(product.id));
    this.updateCart();
  }

  updateCart() {
    this.cartItems = this.cartService.getCartItems();
    const updatedCart = this.products.map(product => {
      const matchingCartItem = this.cartItems.find(item => item.id === product.id); 
      if (matchingCartItem === undefined) {
        return { ...product, quantity: 0 }; 
      }
      return { ...product, quantity: matchingCartItem.quantity };
    });
    for(let i = 0; i < updatedCart.length; i++) {
      if(updatedCart[i].quantity === 0) {
        updatedCart.splice(i, 1);
        i--;
      }
    }
    this.CartProductsWithQuantities.next(updatedCart);
    this.totalAmount = this.getTotalPrice();
  }
  

  buyProduct() {
    if(this.authService.getId() === 0) {
      this.messages = []
      this.messages = [...this.messages, {severity: 'error', summary: 'Échec de l\'Achat', detail: 'Vous devez être connecté pour passer une commande.'}];
      return;
    }
    if(this.totalAmount === 0) {
      this.messages = []
      this.messages = [...this.messages, {severity: 'error', summary: 'Échec de l\'Achat', detail: 'Vous ne pouvez pas passer une commande avec un panier vide.'}];
      return;
    }
    const currentDate = new Date().toISOString().split('T')[0]; 
    const order = {
      orderId: this.generateComplexId(),
      userId: this.authService.getId(),
      totalPrice: this.totalAmount,
      date: currentDate,
    };
  
    console.log(order);
    this.orderService.addOrder(order).subscribe(
      (response) => {
        this.cartService.clearCart();
        this.updateCart();
        this.messages = [...this.messages, {severity: 'success', summary: 'Achat Terminé', detail: 'Your order has been placed successfully!'}];
      },
      (error) => {
        this.messages = [...this.messages, {severity: 'error', summary: 'Échec de l\'Achat', detail: 'There was an error processing your purchase. Please try again.'}];
      }
    );
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.updateCart(); 
    });
  }
}
