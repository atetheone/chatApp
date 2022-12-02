import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../entities/user.entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken ?: string;

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUri}/signup`, user);
  }

  login(userAuth: { email: any; password: any; }) {
    throw new Error('Method not implemented.');
  }
}
