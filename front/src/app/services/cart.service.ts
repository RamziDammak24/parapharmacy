import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {}

  getCartItems(): any[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(id: number): void {
    const cart = this.getCartItems();
    const existingItem = cart.find(item => item.id === id);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else  {
      cart.push({id: id, quantity: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart)); 
  }
  
  removeFromCart(id: number): void {
    const cart = this.getCartItems();
    const updatedCart = cart.filter(i => i.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); 
  }

  DecreaseQuantity(id: number): void {
    const cart = this.getCartItems();
    const existingItem = cart.find(item => item.id === id);
  
    if (existingItem) {
      if(existingItem.quantity === 1) {
        this.removeFromCart(id);
        return;
      }
      existingItem.quantity -= 1;
    } 

    localStorage.setItem('cart', JSON.stringify(cart)); 
  }

  clearCart(): void {
    localStorage.removeItem('cart');
  }
}
