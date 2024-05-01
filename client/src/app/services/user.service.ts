import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUri}/api/auth/users`)
      .pipe(
        map(
          (resp: User[]) => {
            return resp;
          }
        )
      );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUri}/users/${id}`)
      .pipe(
        map(
          (resp: User) => {
            return resp;
          }
        )
      );
  }
}
