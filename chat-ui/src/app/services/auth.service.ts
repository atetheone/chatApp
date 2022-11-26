import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../entities/user.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(user: User) {
    this.http.post<User>(`${environment.apiUri}/signup`, user)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.error(error)
      )
  }
}
