import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getId(): number {
    const id = localStorage.getItem('id');
    return id ? parseInt(id, 10) : 0;
  }

  setId(id: number): void {
    localStorage.setItem('id', id.toString());
  }

  getName(): string {
    return localStorage.getItem('name') || '';
  }

  setName(name: string): void {
    localStorage.setItem('name', name);
  }

  checkLoginState(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  login(): void {
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
  }
}
