import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Product {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    category?: string;
    image?: string;
}