import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/User';
import { catchError, map, Observable , of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  private addUserUrl = 'http://localhost:8080/api/adduser';
  private getUserUrl = 'http://localhost:8080/api/users';
  addUser(user: User) {
    return this.http.post(this.addUserUrl, user);
  }
  GetUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getUserUrl).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching users', error);
        return of([]);
      })
    );
  }
  }

