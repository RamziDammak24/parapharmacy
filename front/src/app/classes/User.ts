import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class User {
  id?: number;
  name?: string;
  firstName?: string;
  email?: string;
  dateOfBirth?: string;
  password?: string;
}
