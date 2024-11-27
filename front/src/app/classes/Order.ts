import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Order {
  orderId?: string;     
  userId?: number;
  date?: string;        
  totalPrice?: number;  
}
