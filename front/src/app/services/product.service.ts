import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../classes/Product';
import { map, Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    private productsUrl = 'http://localhost:8080/api/products';

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productsUrl).pipe(
            map(response => response), 
            catchError(error => {
                console.error('Error fetching products', error);
                return of([]);
            })
        );
    }

}
