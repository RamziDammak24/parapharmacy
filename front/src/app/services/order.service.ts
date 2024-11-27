import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../classes/Order';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private addOrderUrl = 'http://localhost:8080/api/addorder';
  private getOrderUrl = 'http://localhost:8080/api/orders';

  addOrder(order: Order) {
    return this.http.post(this.addOrderUrl, order);
  }

  GetOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.getOrderUrl).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching Orders', error);
        return of([]);
      })
    );
  }


  constructor(private http: HttpClient) {}
}
